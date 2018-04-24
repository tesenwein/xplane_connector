import { LatLng, LeafletEvent } from 'leaflet';
import * as React from 'react';
import { CircleMarker, Map, TileLayer } from 'react-leaflet';
import { Col, Row } from "reactstrap";
import { FlightData, FlightDataPackInterface } from '../../lib/FlightData';
import { XplaneEmmiter } from '../../lib/XplaneConnector';
import "./InFlightMap.scss";


export interface InFlightMapStates {
    flightPos: FlightDataPackInterface
    zoom: number
    connected: boolean
}

export interface InFlightMapProps {

}

export default class InFlightMap extends React.Component<InFlightMapProps, InFlightMapStates> {

    public componentMounted: boolean = false;

    public constructor(props: InFlightMapProps) {

        super(props)

        const zoom = parseInt(localStorage.getItem("lastZoomInFlightMap") || '13')

        this.state = {
            zoom: zoom,
            flightPos: FlightData.getData(),            
            connected: XplaneEmmiter.connected
        }

        this.onZoom = this.onZoom.bind(this);
    }

    public onZoom(e: LeafletEvent) {
        localStorage.setItem("lastZoomInFlightMap", e.target._zoom)
        this.setState({ zoom: e.target._zoom });
    }

    public componentWillMount() {
        this.componentMounted = true

        FlightData.on("change", (currentData: FlightDataPackInterface) => {
            if (this.componentMounted) {
                this.setState({ flightPos: currentData, connected: true });
            }
        })
    }

    public componentWillUnmount() {
        this.componentMounted = false
    }


    public render() {
        const position = new LatLng(this.state.flightPos.lat, this.state.flightPos.lon)

        const CheckConnection = this.state.connected ? (
            <div>
                <Row>
                    <div className="col-sm">
                        InFlightMap: {this.state.flightPos.lon} / {this.state.flightPos.lat}
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
                <div />
            )

        return (
            <div>
                {CheckConnection}
            </div>
        );
    }
}
