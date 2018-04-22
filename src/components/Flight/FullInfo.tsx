import * as React from 'react';
import { XplaneFlightPos, XplaneEmmiter } from "../../lib/XplaneConnector";
import { Map, Marker, Popup, TileLayer, CircleMarker } from 'react-leaflet'
import { LatLng, LatLngLiteral, LeafletEvent } from 'leaflet';
import { Row, Col, Alert } from "reactstrap"

import "./FullInfo.scss"

export interface FullInfoUrlParams {
}

export interface FullInfoStates {
    flightPos: XplaneFlightPos
    zoom: number
    connected: boolean
}

export interface FullInfoProps {

}

export default class FullInfo extends React.Component<FullInfoProps, FullInfoStates> {

    public constructor(props: FullInfoProps) {
        super(props)

        this.state = {
            flightPos: {
                lat: 0,
                lon: 0
            },
            zoom: 13,
            connected: false
        }


        this.onZoom = this.onZoom.bind(this);
    }

    public onZoom(e: LeafletEvent) {
        this.setState({ zoom: e.target._zoom });
    }

    public componentWillMount() {

        XplaneEmmiter.on("change", (geoCurrentData: XplaneFlightPos) => {
            this.setState({ flightPos: geoCurrentData, connected: true })
        })
    }

    public render() {
        const position = new LatLng(this.state.flightPos.lat, this.state.flightPos.lon)

        const CheckConnection = this.state.connected ? (
            <div>
                <Row>
                    <div className="col-sm">
                        FullInfo: {this.state.flightPos.lon} / {this.state.flightPos.lat}
                    </div>
                </Row>
                <Row>
                    <Col>
                        <Map onzoomend={this.onZoom} className="mapWindow" center={position} zoom={this.state.zoom} >
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                            />
                            <CircleMarker center={position} color="red" radius={10} />
                        </Map>
                    </Col>
                </Row>
            </div>
        ) : (
                <Row>
                    <Col>
                        <Alert color="dark">Not Connected to XPlane</Alert>
                    </Col>
                </Row>
            )

        return (
            <div>
                {CheckConnection}
            </div>
        );
    }
}
