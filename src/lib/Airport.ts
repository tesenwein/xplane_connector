import * as PouchDB from 'pouchdb-browser';
import { Debugger } from 'electron';

export interface AirportInterface {
    _id: string
    _rev?: string
    icao: string
    name: string
    lat: number
    lon: number
    freq?: string
}

export default class Airport implements AirportInterface {

    public _id = ""
    public icao = ""
    public name = ""
    public lat = 0
    public lon = 0
    public freq = ""


    public constructor(icao: string) {

        this.icao = icao
        this._id = icao

    }

    public static async find(search: string, limit: number = 20): Promise<PouchDB.Find.FindResponse<any>> {

        const searchConfig: PouchDB.Find.FindRequest<AirportInterface> = {
            selector: {
                $or: [
                    { name: { $regex: RegExp(search, "i") } },
                    { icao: { $regex: RegExp(search, "i") } }
                ]

            },
            fields: ['icao', 'name'],
            limit: 100
        }

        return AirportsDB.find(searchConfig)

    }

    public static async cleanDatabase(): Promise<boolean[]> {

        console.log("Cleaning Database Airports")

        const promises: Promise<boolean>[] = []

        await AirportsDB.allDocs().then((rec) => {
            rec.rows.forEach((airport) => {
                const lrPromise = new Promise<boolean>((resolveApt, rejectApt) => {
                    AirportsDB.get<AirportInterface>(airport.id).then((doc) => {
                        AirportsDB.remove(doc).then(() => {
                            resolveApt(true)
                        }).catch((e) => {
                            rejectApt(e)
                        })
                    }).catch((e) => {
                        rejectApt(e)
                    })
                });
                promises.push(lrPromise)
            })
        });

        return Promise.all(promises)
    }


    public save(): Promise<boolean> {

        return new Promise<boolean>((resolve, reject) => {

            AirportsDB.get<AirportInterface>(this._id).then((doc) => {

                doc._id = this._id
                doc.icao = this.icao
                doc.name = this.name
                doc.freq = this.freq
                doc.lat = this.lat
                doc.lon = this.lon

                AirportsDB.put(doc).then(() => {
                    resolve(true)
                }).catch((e) => {
                    reject(e)
                })

            }).catch((e) => {

                const doc: AirportInterface = {
                    _id: this._id,
                    icao: this.icao,
                    name: this.name,
                    freq: this.freq,
                    lat: this.lat,
                    lon: this.lon
                }


                AirportsDB.post<AirportInterface>(doc).then(() => {
                    resolve(true)
                }).catch((e) => {
                    reject(e)
                })
            })
        });

    }

};

// Init Database
export const AirportsDB = new PouchDB('airports')
PouchDB.plugin(require('pouchdb-find').default)
AirportsDB.createIndex({
    index: { fields: ['icao', 'name'] }
})
