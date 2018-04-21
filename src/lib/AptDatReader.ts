import * as LineByLineReader from 'line-by-line';
import ConfigStore from "../flux/stores/ConfigStore";
import { DataManagerInterface } from '../flux/actions/DataManagerActions';


export interface AptDataReaderInterface {
    icao?: string
    city?: string
    transition_alt?: number
}

interface AirportIndex {
    [key: string]: any
}


export default class AptDataReader {

    index: AirportIndex = {}

    public async createAirportIndex(): Promise<AirportIndex> {

        let lr = new LineByLineReader(ConfigStore.getConfig("xplane.path") + "/Resources/default scenery/default apt dat/Earth nav data/apt.dat", { skipEmptyLines: true })
        let counter = 0

        return new Promise<AptDataReaderInterface>((resolve, reject) => {

            console.log("Creating Airport Index")

            lr.on("line", (line: string) => {
                line = line.replace(/ +(?= )/g, '');

                if (line.startsWith("1 ")) {
                    let parseLine = line.split(" ")
                    this.index[parseLine[4]] = counter
                }

                counter++
            });

            lr.on("end", () => {
                console.log("Complete Airport Index")
                resolve(this.index)
            })


            lr.on("error", (err) => {
                reject(err)
            })
        })

    }


    public getAirportData(icao: string): Promise<AptDataReaderInterface> {


        //await Airport.cleanDatabase()

        let startAt = this.index[icao] | 0

        let lastAirport = null;
        let lr = new LineByLineReader(ConfigStore.getConfig("xplane.path") + "/Resources/default scenery/default apt dat/Earth nav data/apt.dat", { skipEmptyLines: true, start: startAt })
        let airportData: AptDataReaderInterface = {}
        let airportFound = false;

        let lrPromise = new Promise<AptDataReaderInterface>((resolve, reject) => {

            lr.on("line", (line: string) => {

                if (line.startsWith("1 ")) {
                    if (line.search(icao) > -1) {
                        airportData.icao = icao;
                        airportFound = true
                    }
                    if (airportFound) {
                        console.log("ending Search", icao)
                        lr.end();

                    }
                }

                if (airportFound) {
                    airportData.transition_alt = AptDataReader.readTransition(line)
                    airportData.city = AptDataReader.readCity(line)
                }
            });

            lr.on("end", () => {
                console.log(airportData)
                resolve(airportData)
            })

            lr.on("error", (err) => {
                reject(err)
            })
        });

        return lrPromise
    }


    private static readTransition(line: string): number | undefined {
        if (line.startsWith("1302 transition_alt")) {
            let res = line.replace("1302 transition_alt ", "");
            if (res.length > 0) {
                return parseInt(res)
            }
            else {
                return undefined
            }
        }
    }

    private static readCity(line: string): string | undefined {
        if (line.startsWith("1302 city ")) {
            let res = line.replace("1302 city ", "");
            if (res.length > 0) {
                return res
            }
            else {
                return undefined
            }
        }
    }
}