import { AirportInterface, AirportsDB } from "./Airport";


export interface AirportIndexApt {
    icao: string
    lat: number
    lon: number
}

class AirportIndex {

    public data: Array<AirportIndexApt> = []

    public constructor() {

    }

    public async build(): Promise<boolean[]> {

        let promises: Array<Promise<boolean>> = []

        console.log("Building AirportIndex")

        this.data = []

        await AirportsDB.allDocs().then((rec) => {
            rec.rows.forEach((airport) => {
                let lrPromise = new Promise<boolean>((resolveApt, rejectApt) => {
                    AirportsDB.get<AirportInterface>(airport.id).then((doc) => {
                        let apt: AirportIndexApt = {
                            icao: doc.icao,
                            lon: doc.lon,
                            lat: doc.lat
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

        Promise.all(promises).then(()=>{
            console.log("AirportIndex loaded with", this.data.length, "Records")
        })
        return Promise.all(promises)
    }

}

const AirportIndexDirectory = new AirportIndex()
export default AirportIndexDirectory
