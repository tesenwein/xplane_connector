import { LatLonVectors } from "geodesy";
import * as React from 'react';
import AirportIndex from '../../lib/AirportIndex';
import { XplaneEmmiter } from '../../lib/XplaneConnector';
import { Row, Col, Alert } from "reactstrap"
import { FlightDataPackInterface, FlightData } from "../../lib/FlightData";


export interface ClosestAiprotsStates {
    connected: boolean
}

export interface ClosestAiprotsProps {
}

export default class ClosestAiprots extends React.Component<ClosestAiprotsProps, ClosestAiprotsStates> {


    public constructor(props: ClosestAiprotsProps) {
        super(props)

        this.state = {
            connected: false
        }
    }

    private prepareIndex() {

        AirportIndex.data.forEach(element => {

        });
    }

    public componentWillMount() {

        this.prepareIndex()

        FlightData.on("sig_postion", () => {
            FlightData.nearbyAiports()
        })

    }

    public render() {

        return (
             <div>Closest Airprts</div>
        );
    }
}
