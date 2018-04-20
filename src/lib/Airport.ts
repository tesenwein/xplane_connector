import * as PouchDB from 'pouchdb-browser';
import * as Crypto from 'crypto';

//@ts-ignore
window.pouchdb = PouchDB;

interface dbAiport {
    _id: string
    _rev?: string
    icao: string
    name: string
    freq: string
}

export default class Airport {

    private Db: PouchDB.Database

    public icao: string
    public _id: string
    public name: string = ""
    public freq: string = ""

    public constructor(icao: string) {

        this.Db = new PouchDB('airports')

        this.icao = icao
        this._id = icao

    }


    public save(): Promise<boolean> {

        return new Promise<boolean>((resolve, reject) => {

            let result: PouchDB.Core.Response;

            this.Db.get<dbAiport>(this._id).then((doc) => {

                doc._id = this._id
                doc.icao = this.icao
                doc.name = this.name
                doc.freq = this.freq

                this.Db.put(doc).then(() => {
                    resolve(true)
                }).catch((e) => {
                    reject(e)
                })
            }).catch((e) => {

                let doc:dbAiport = {
                    _id:this._id,
                    icao:this.icao,
                    name:this.name,
                    freq:this.freq
                }

                this.Db.put<dbAiport>(doc).then(() => {
                    resolve(true)
                }).catch((e) => {
                    reject(e)
                })
            })
        });

    }

};
