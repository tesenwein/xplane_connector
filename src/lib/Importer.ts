import * as fs from 'fs';

import Airport from './Airport';
import Runway from './Runway';

import ConfigStore from "../flux/stores/ConfigStore";



export default class Importer {


    public static async loadAiprotData() {

        let promises:Array<Promise<boolean>> = []

        let airportData = fs.readFileSync(ConfigStore.getConfig("xplane.path") + ConfigStore.getConfig("xplane.airports"))
        let airportDataArray = airportData.toString().split("\n\n")

        for (let i in airportDataArray) {

            let aiportData = airportDataArray[i].split("\n")

            let airportLine = aiportData[0].split(",")
            let apt = new Airport(airportLine[1])

            //lets remove the Airport info
            aiportData.splice(0, 1);

            //runway loop
            for (let x in aiportData) {
                let runwayData = aiportData[x].split(",")
                let runway = new Runway(apt.icao, runwayData[1])
                runway.length = parseInt(runwayData[4])
            }

            promises.push(apt.save())

        }

        return Promise.all(promises)
    }
}