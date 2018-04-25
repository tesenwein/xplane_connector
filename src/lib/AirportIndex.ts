import { AirportInterface, AirportsDB } from "./Airport";


export interface AirportIndexApt {
    icao: string
    lat: number
    lon: number
    distance: number | null
}

class AirportIndexStatic {

    public data: AirportIndexApt[] = []

    public constructor() {

    }

    public async build(): Promise<boolean[]> {

        const promises: Promise<boolean>[] = []

        console.log("Building AirportIndex")

        this.data = []

        await AirportsDB.allDocs().then((rec) => {
            rec.rows.forEach((airport) => {
                const lrPromise = new Promise<boolean>((resolveApt, rejectApt) => {
                    AirportsDB.get<AirportInterface>(airport.id).then((doc) => {
                        const apt: AirportIndexApt = {
                            icao: doc.icao,
                            lon: doc.lon,
                            lat: doc.lat,
                            distance: null
                        }
                        this.data.push(apt)
                        resolveApt(true)
                    }).catch((e) => {
                        rejectApt(e)
                    })
                });
                promises.push(lrPromise)
            })
        });

        Promise.all(promises).then(() => {
            console.log("AirportIndex loaded with " + this.data.length + " Records")
        })
        return Promise.all(promises)
    }

}

const AirportIndex = new AirportIndexStatic()
export default AirportIndex
