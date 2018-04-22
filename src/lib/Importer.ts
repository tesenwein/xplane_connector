import * as LineByLineReader from 'line-by-line';
import AptDatReader from "../lib/AptDatReader";
import ConfigStore from "../lib/ConfigStore";
import Airport from './Airport';


export default class Importer {


    public static async loadAiprotData(): Promise<boolean[]> {

        console.log("Importing Database Airports")

        const AirportDat = new AptDatReader();
        // await AirportDat.createAirportIndex()

        let lastAirport = null;
        const lr = new LineByLineReader(ConfigStore.getConfig("xplane.path") + ConfigStore.getConfig("xplane.airports"))
        const promises: Promise<boolean>[] = []

        const lrPromise = new Promise<boolean>((resolve, reject) => {

            lr.on("line", (line: string) => {

                if (line.startsWith("A,")) {
                    const aiportData = line.split(",")
                    const apt = new Airport(aiportData[1])
                    apt.name = aiportData[2]
                    apt.lat = parseFloat(aiportData[3])
                    apt.lon = parseFloat(aiportData[4])

                    const aptPromise = apt.save()
                    lr.pause()

                    promises.push(aptPromise)
                    aptPromise.then(() => {
                        lr.resume()
                        console.log("Imported Airport", apt.icao, apt.lat, apt.lon)
                    })

                    // get Dat information
                    // AirportDat.getAirportData(apt.icao).then((data)=>{                        
                    // promises.push(apt.save())
                    // })

                    lastAirport = apt.icao

                }
            });

            lr.on("end", () => {
                resolve(true)
            })

            lr.on("error", (err) => {
                reject(err)
            })
        });

        promises.push(lrPromise);

        /*
        let clPromise = new Promise<boolean>((resolve, reject) => {
            AirportsDB.compact().then(() => {
                resolve(true)
            }).catch((err) => {
                reject(err)
            })
        });

        promises.push(clPromise*/

        return Promise.all(promises)
    }
}