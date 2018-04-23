import * as ExtPlaneJs from "extplanejs"
import { EventEmitter } from "events";
import { setTimeout, setInterval } from "timers";


export interface XplaneFlightData {
    lat: number
    lon: number
    speed: number
}

export default class XplaneConnector extends EventEmitter {

    private extPlaneJs: ExtPlaneJs | undefined

    public xplaneData: XplaneFlightData = {
        lat: 0,
        lon: 0,
        speed: 0
    }

    private lastUpdate = new Date()

    private controlTimer: NodeJS.Timer = setInterval(() => { this.alive() }, 1000)

    public connected: boolean = false;

    public connect() {

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

                this.extPlaneJs.on("data-ref", (dataRef, value) => {

                    switch (dataRef) {
                        case "sim/cockpit2/gauges/indicators/airspeed_kts_pilot":
                            this.xplaneData.speed = value
                            break;
                        case "sim/flightmodel/position/longitude":
                            this.xplaneData.lon = value
                            break;
                        case "sim/flightmodel/position/latitude":
                            this.xplaneData.lat = value
                            break;

                        default:
                            break;
                    }

                    this.lastUpdate = new Date()

                    this.emit("change", this.xplaneData)
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

        //console.log((now.getTime() - now.getTime()))

        if ((now.getTime() - this.lastUpdate.getTime()) >= 1000) {
            this.connected = false
            this.emit("disconnected")
        }
        else {
            this.connected = true
            this.emit("connected")
        }

        console.log("Connection to XPlane status:", this.connected)

        this.emit("connectionchange")
    }
}

export const XplaneEmmiter = new XplaneConnector()