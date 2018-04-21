import * as PouchDB from 'pouchdb-browser';


export interface AirportInterface {
    _id: string
    _rev?: string
    icao: string
    name: string
    freq?: string
    lat: string
    lon: string
}

export default class Airport {

    public _id: string
    public icao: string
    public name: string = ""
    public freq: string = ""
    public lat: string = ""
    public lon: string = ""


    public constructor(icao: string) {

        this.icao = icao
        this._id = icao

    }

    public static async find(search: string, limit: number = 20): Promise<PouchDB.Find.FindResponse<any>> {

        let searchConfig: PouchDB.Find.FindRequest<AirportInterface> = {
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

    public static cleanDatabase(): Promise<boolean> {

        return new Promise<boolean>((resolve, reject) => {

            AirportsDB.allDocs().then(function (result) {
                return Promise.all(result.rows.map(function (row) {
                    return AirportsDB.remove(row.id, row.value.rev);
                }));
            }).then(function () {
                resolve(true)
            }).catch(function (err) {
                reject(err)
            });

        });

    }


    public save(): Promise<boolean> {

        return new Promise<boolean>((resolve, reject) => {

            let result: PouchDB.Core.Response;

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

                let doc: AirportInterface = {
                    _id: this._id,
                    icao: this.icao,
                    name: this.name,
                    freq: this.freq,
                    lat: this.lat,
                    lon: this.lon
                }


                AirportsDB.put<AirportInterface>(doc).then(() => {
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
