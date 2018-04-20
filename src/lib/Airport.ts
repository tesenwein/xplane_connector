import * as PouchDB from 'pouchdb-browser';
import * as Crypto from 'crypto';


interface dbAiport {
    _id: string
    _rev?: string
    icao: string
    name: string
    freq: string
}

export default class Airport {


    public icao: string
    public _id: string
    public name: string = ""
    public freq: string = ""

    public constructor(icao: string) {

        this.icao = icao
        this._id = icao

    }

    public static async find(search: string) {

        return AirportsDB.find({
            selector: { name: search, icao:search },
            fields: ['icao', 'name']
        })

    }


    public save(): Promise<boolean> {

        return new Promise<boolean>((resolve, reject) => {

            let result: PouchDB.Core.Response;

            AirportsDB.get<dbAiport>(this._id).then((doc) => {

                doc._id = this._id
                doc.icao = this.icao
                doc.name = this.name
                doc.freq = this.freq

                AirportsDB.put(doc).then(() => {
                    resolve(true)
                }).catch((e) => {
                    reject(e)
                })

            }).catch((e) => {

                let doc: dbAiport = {
                    _id: this._id,
                    icao: this.icao,
                    name: this.name,
                    freq: this.freq
                }

                AirportsDB.put<dbAiport>(doc).then(() => {
                    resolve(true)
                }).catch((e) => {
                    reject(e)
                })
            })
        });

    }

};

// Init Database
const AirportsDB = new PouchDB('airports')
PouchDB.plugin(require('pouchdb-find').default)
AirportsDB.createIndex({
    index: { fields: ['icao', 'name'] }
})