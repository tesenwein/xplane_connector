import { EventEmitter } from "events";
import { LatLonVectors } from "geodesy";
import Airport, { AirportInterface } from "./Airport";
import AirportIndex, { AirportIndexApt } from "./AirportIndex";

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

    public trimLonLatAiprotsListByCurrentPostion(airportList: AirportIndexApt[]): AirportIndexApt[] {

        const currentShortPos = FlightDataStatic.trimLonLat(this.data.lat, this.data.lon, 0)
        const newList: AirportIndexApt[] = []


        airportList.forEach((airport) => {
            if ((airport.lat >= currentShortPos[0] - 1 && airport.lat <= currentShortPos[0] + 1) &&
                (airport.lon >= currentShortPos[1] - 1 && airport.lon <= currentShortPos[1] + 1)) {
                newList.push(airport)
            }
        })

        return newList
    }

    public static trimLonLat(lat: number, lon: number, detailLevel: number = 3) {

        return [parseFloat(lat.toFixed(detailLevel)), parseFloat(lon.toFixed(detailLevel))]

    }

    public async nearbyAiports(maxRecords: number = 100): Promise<AirportInterface[]> {

        const resultList: AirpotDistanceInterface[] = []
        const yourPos = new LatLonVectors(this.data.lat, this.data.lon)

        this.trimLonLatAiprotsListByCurrentPostion(AirportIndex.data).forEach(airport => {
            resultList.push({
                icao: airport.icao,
                distance: yourPos.distanceTo(new LatLonVectors(airport.lat, airport.lon))
            })
        });

        return this.fromAirportDistanceToAirortList(resultList.sort(this.airportDistanceSort).slice(0,maxRecords))
    }

    private async fromAirportDistanceToAirortList(aiportDistanceList: AirpotDistanceInterface[]): Promise<AirportInterface[]> {

        const promises: Promise<AirportInterface>[] = []
        const newAirportList: AirportInterface[] = []

        aiportDistanceList.forEach(element => {
            const apt = new Airport(element.icao).load()
            apt.then((data) => {
                newAirportList.push(data)
            })
            promises.push(apt)
        });

        return Promise.all(promises);
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