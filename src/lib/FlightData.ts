import { EventEmitter } from "events";
import { AirportInterface } from "./Airport";
import { LatLonVectors } from "geodesy";
import AirportIndex from "./AirportIndex";

export interface FlightDataPackInterface {
    lat: number
    lon: number
    speed: number
}

export interface AirpotDistanceInterface {
    icao: string,
    distance: number
}

class FlightDataStatic extends EventEmitter {

    private data: FlightDataPackInterface
    private previousData: FlightDataPackInterface

    private oldLon: number = 0
    private oldLat: number = 0

    public constructor() {
        super()

        this.data = {
            lon: 0,
            lat: 0,
            speed: 0
        }

        this.previousData = this.data;
    }

    public getData() {

        return this.data
    }

    public setData(data: FlightDataPackInterface) {

        this.previousData = JSON.parse(JSON.stringify(data))
        this.data = data

        this.checkPositionChange(3)

        this.emit("change", this.data)

    }

    public checkPositionChange(detailLevel: number) {

        const curPos = FlightDataStatic.trimLonLat(this.data.lat, this.data.lat, detailLevel)

        if (curPos[0] !== this.oldLat || curPos[1] !== this.oldLon) {
            this.emit("sig_postion")
        }

        this.oldLat = curPos[0]
        this.oldLon = curPos[1]
    }

    public static trimLonLat(lat: number, lon: number, detailLevel: number) {

        return [parseFloat(lat.toFixed(detailLevel)), parseFloat(lon.toFixed(detailLevel))]

    }

    public nearbyAiports(maxRecords: number = 100) {

        const aiprortList = AirportIndex.data
        const yourPos = new LatLonVectors(this.data.lat, this.data.lon)
        const resultList: AirpotDistanceInterface[] = []


        aiprortList.forEach(airport => {
            resultList.push({
                icao: airport.icao,
                distance: yourPos.distanceTo(new LatLonVectors(airport.lat, airport.lon))
            })
        });


        return resultList.sort(this.airportDistanceSort).splice(0, maxRecords)
    }

    private airportDistanceSort(a: AirpotDistanceInterface, b: AirpotDistanceInterface) {
        if (a.distance < b.distance)
            return -1;
        if (a.distance > b.distance)
            return 1;
        return 0;
    }

}

export const FlightData = new FlightDataStatic()