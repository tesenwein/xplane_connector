import { LatLonVectors } from "geodesy";
import * as React from 'react';
import AirportIndex from '../../lib/AirportIndex';
import { XplaneEmmiter, XplaneFlightData } from '../../lib/XplaneConnector';
import { Row, Col, Alert } from "reactstrap"


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

        XplaneEmmiter.on("change", (geoCurrentData: XplaneFlightData) => {
            this.setState({ connected: true })
        })

    }

    public render() {

        const ClosestAirpotsBox = this.state.connected ? (
            <div>Closest Airprts</div>
        ) : (
                <Row>
                    <Col>
                        <Alert color="dark">Not Connected to XPlane</Alert>
                    </Col>
                </Row>
            )

        return (
            <div>
                {ClosestAirpotsBox}
            </div>
        );
    }
}
