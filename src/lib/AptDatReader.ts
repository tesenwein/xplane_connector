import * as debug from "debug";
import * as LineByLineReader from 'line-by-line';
import ConfigStore from "../lib/ConfigStore";

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

        const lr = new LineByLineReader(ConfigStore.getConfig("xplane.path") + "/Resources/default scenery/default apt dat/Earth nav data/apt.dat", { skipEmptyLines: true })
        let counter = 0

        return new Promise<AptDataReaderInterface>((resolve, reject) => {

            debug("Creating Airport Index")

            lr.on("line", (line: string) => {
                const lineNew = line.replace(/ +(?= )/g, '');

                if (line.startsWith("1 ")) {
                    const parseLine = lineNew.split(" ")
                    this.index[parseLine[4]] = counter
                }

                counter = counter + 1
            });

            lr.on("end", () => {
                debug("Complete Airport Index")
                resolve(this.index)
            })


            lr.on("error", (err) => {
                reject(err)
            })
        })

    }


    public getAirportData(icao: string): Promise<AptDataReaderInterface> {

        const startAt = this.index[icao] | 0

        const lastAirport = null;
        const lr = new LineByLineReader(ConfigStore.getConfig("xplane.path") + "/Resources/default scenery/default apt dat/Earth nav data/apt.dat", { skipEmptyLines: true, start: startAt })
        const airportData: AptDataReaderInterface = {}
        let airportFound = false;

        const lrPromise = new Promise<AptDataReaderInterface>((resolve, reject) => {

            lr.on("line", (line: string) => {

                if (line.startsWith("1 ")) {
                    if (line.search(icao) > -1) {
                        airportData.icao = icao;
                        airportFound = true
                    }
                    if (airportFound) {
                        debug("ending Search " + icao)
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
            const res = line.replace("1302 transition_alt ", "");
            if (res.length > 0) {
                return parseInt(res)
            }

            return undefined
        }
    }

    private static readCity(line: string): string | undefined {
        if (line.startsWith("1302 city ")) {
            const res = line.replace("1302 city ", "");
            if (res.length > 0) {
                return res
            }

            return undefined
        }
    }
}