import { EventEmitter } from "events";
import * as ExtPlaneJs from "extplanejs";
import { setInterval } from "timers";
import { FlightData } from "./FlightData";

export default class XplaneConnector extends EventEmitter {

    private extPlaneJs: ExtPlaneJs | undefined

    private lastUpdate = new Date()

    private controlTimer: NodeJS.Timer = setInterval(() => { this.alive() }, 500)

    public connected: boolean = false

    public paused: boolean = false

    public simulation = require("../../config.json").simulation;

    public connect() {

        if (this.simulation) {
            this.simulate()
            return
        }


        console.log("Connecting to XPlane")

        this.extPlaneJs = new ExtPlaneJs({
            host: '127.0.0.1',
            port: 51000,
            broadcast: true
        })

        this.extPlaneJs.on("loaded", () => {

            console.log("Connecter Loaded")

            if (this.extPlaneJs) {

                this.extPlaneJs.client.interval(0.33)

                this.extPlaneJs.client.subscribe("sim/cockpit2/gauges/indicators/airspeed_kts_pilot")
                this.extPlaneJs.client.subscribe("sim/flightmodel/position/latitude")
                this.extPlaneJs.client.subscribe("sim/flightmodel/position/longitude")

                this.extPlaneJs.client.subscribe("sim/time/sim_speed")

                this.extPlaneJs.on("data-ref", (dataRef, value) => {

                    const currentData = FlightData.getData()

                    switch (dataRef) {
                        case "sim/cockpit2/gauges/indicators/airspeed_kts_pilot":
                            currentData.speed = parseInt(value)
                            break;
                        case "sim/flightmodel/position/longitude":
                            currentData.lon = parseFloat(value)
                            break;
                        case "sim/flightmodel/position/latitude":
                            currentData.lat = parseFloat(value)
                            break;
                        case "sim/time/sim_speed":
                            if (parseInt(value) < 1) {
                                this.paused = true
                            }
                            else {
                                this.paused = false
                            }
                            break;
                        default:
                            break;
                    }

                    FlightData.setData(currentData)

                    this.lastUpdate = new Date()
                })
            }
        })
    }

    public disconnect() {

        if (this.extPlaneJs && this.connected) {
            this.extPlaneJs.client.disconnect()
        }

        this.connected = false

        this.emit("disconnected")
    }

    public alive() {

        const now = new Date()

        if (((now.getTime() - this.lastUpdate.getTime()) <= 1000) || this.paused || this.simulation) {
            this.connected = true
            this.emit("connected")
        }
        else {
            this.connected = false
            this.emit("disconnected")
        }

        console.log("Connection to XPlane status: " + this.connected)

        this.emit("connectionchange")
    }

    private simulate() {

        const currentData = FlightData.getData()

        this.connected = true;

        currentData.lat = 47.451625
        currentData.lon = 8.556830

        setInterval(() => {
            currentData.lat += 0.0001
            currentData.lon += 0.0001

            FlightData.setData(currentData)
        }, 200)

    }
}

export const XplaneEmmiter = new XplaneConnector()