import { LatLonVectors } from "geodesy";
import * as React from 'react';
import AirportIndexDirectory from '../../lib/AirportIndex';
import { XplaneEmmiter, XplaneFlightPos } from '../../lib/XplaneConnector';


export interface ClosestAiprotsStates {
}

export interface ClosestAiprotsProps {
}

export default class ClosestAiprots extends React.Component<ClosestAiprotsProps, ClosestAiprotsStates> {


    public constructor(props: ClosestAiprotsProps) {
        super(props)
    }

    private prepareIndex() {

        AirportIndexDirectory.data.forEach(element => {
   
        });
    }

    public componentWillMount() {

        this.prepareIndex()

        XplaneEmmiter.on("change", (geoCurrentData: XplaneFlightPos) => {


        })

    }

    public render() {
        return (
            <div>
                ClosestAiprots
            </div>
        );
    }
}
