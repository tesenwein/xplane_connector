import * as PouchDB from 'pouchdb-browser';

export default class Runway {

    private Db: PouchDB.Database

    public icao: string
    public id: string
    public runwayId: string
    public heading:number = 0
    public length:number = 0

    //public hdg: number
    //public length: number

    public constructor(icao: string, runwayId:string) {

        this.Db = new PouchDB('runways')

        this.icao = icao
        this.id = icao + "_" + runwayId
        this.runwayId = runwayId

    }


    public save(){

        let json = {
            id: this.id,
            icao: this.icao,
            runwayId: this.runwayId,
            length: this.length
        }

    }

};
