import * as XPlane from "xplane"
import { EventEmitter } from "events";


export interface XplaneFlightPos {
    lat: number
    lon: number
}

export default class XplaneConnector extends EventEmitter {

    constructor() {

        super()

        let xplane = new XPlane({
            port: {
                in: 49000
            }
        });

        xplane.on('data.globalposition', (geo) => {

            const currentGeo:XplaneFlightPos = {
                lat: geo.lat,
                lon: geo.lon
            }
            this.emit("change", currentGeo)
        });

        xplane.listen();
    }
}

export const XplaneEmmiter = new XplaneConnector()