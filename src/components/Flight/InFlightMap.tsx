
import { Icon, LatLng, LeafletEvent, LeafletMouseEvent } from 'leaflet';
import * as React from 'react';
import { CircleMarker, Map, TileLayer } from 'react-leaflet';
import RotatedMarker from "react-leaflet-rotatedmarker";
import { Redirect } from "react-router";
import Toggle from "react-toggle";
import { Col, ListGroup, ListGroupItem, ListGroupItemHeading, Row } from "reactstrap";
import { AirportInterface } from '../../lib/Airport';
import { FlightData, FlightDataPackInterface } from '../../lib/FlightData';
import { XplaneEmmiter } from '../../lib/XplaneConnector';
import * as MdIconPack from 'react-icons/lib/md'
import ShortInfo from "../Airport/ShortInfo";
import "./InFlightMap.scss";
import "react-toggle/style.css"


export interface InFlightMapStates {
    flightData: FlightDataPackInterface
    planePos: LatLng
    centerPos: LatLng
    zoom: number
    isMapSticky: boolean
    connected: boolean
    airports: AirportInterface[]
    redirect: string | null
}

export interface InFlightMapProps {

}


export default class InFlightMap extends React.Component<InFlightMapProps, InFlightMapStates> {

    private componentMounted: boolean = false;
    private map: Map | null = null
    private stickyToggleSwitch: Toggle | null = null

    public constructor(props: InFlightMapProps) {

        super(props)

        const zoom = parseInt(localStorage.getItem("lastZoomInFlightMap") || '13')

        this.state = {
            flightData: FlightData.getData(),
            zoom: zoom,
            planePos: new LatLng(0, 0),
            centerPos: new LatLng(0, 0),
            isMapSticky: true,
            connected: XplaneEmmiter.connected,
            airports: [],
            redirect: null
        }

        this.onLoad = this.onLoad.bind(this);
        this.onZoom = this.onZoom.bind(this);
        this.onDragStart = this.onDragStart.bind(this);
        this.onStickyMap = this.onStickyMap.bind(this);
        this.onMoveEnd = this.onMoveEnd.bind(this);
    }

    public onLoad(e: LeafletEvent) {
        this.onMoveEnd(e)
    }

    public onDragStart(e: React.MouseEvent<any>) {
        if (this.state.isMapSticky) {
            this.setState({ isMapSticky: !this.state.isMapSticky })
        }
    }

    public onAirportClick(icao: string, e: LeafletMouseEvent) {
        this.setState({ redirect: "/airport/" + icao })

    }

    public onZoom(e: LeafletEvent) {
        localStorage.setItem("lastZoomInFlightMap", e.target._zoom)
        this.setState({ zoom: e.target._zoom });
    }

    public onStickyMap(e: React.ChangeEvent<HTMLInputElement>) {

        this.setState({ isMapSticky: !this.state.isMapSticky })

        if (!this.state.isMapSticky) {
            this.setState({ centerPos: new LatLng(FlightData.getData().lat, FlightData.getData().lon) })
        }
    }

    public onMoveEnd(e: LeafletEvent) {
        if (this.componentMounted) {
            if (this.map) {
                const bounds = this.map.leafletElement.getBounds()
                FlightData.nearbyAiports([bounds.getNorthWest().lat, bounds.getNorthWest().lng], [bounds.getSouthEast().lat, bounds.getSouthEast().lng]).then((airportList) => {
                    this.setState({ airports: airportList })
                })
            }
        }
    }

    public componentWillMount() {
        this.componentMounted = true
        if (this.componentMounted) {
            FlightData.on("change", (currentData: FlightDataPackInterface) => {

                this.setState({ planePos: new LatLng(currentData.lat, currentData.lon), connected: true });
                if (this.state.isMapSticky) {
                    this.setState({ centerPos: this.state.planePos })
                }
            })
        }
    }


    public componentWillUnmount() {
        this.componentMounted = false
    }


    public render() {

        const rows: JSX.Element[] = []
        const airportsMap: JSX.Element[] = []


        const planeStyle: React.CSSProperties = {
            transform: "rotate(" + this.state.flightData.heading + "deg)"
        }

        const planeIcon = new Icon({
            iconUrl: require("../../../assets/images/plane_icon.png"),
            iconSize: [30, 30],
            iconAnchor: [15, 15],
            style: planeStyle
        })


        let counter = 0

        this.state.airports.map((airportItem) => {
            rows.push(<ListGroupItem key={"list_" + airportItem.toString() + counter} ><ShortInfo key={airportItem.toString() + counter} airport={airportItem} /></ListGroupItem>);
            airportsMap.push(<CircleMarker onclick={this.onAirportClick.bind(this, airportItem.icao)} key={"apt_" + airportItem.toString() + counter} center={new LatLng(airportItem.lat, airportItem.lon)} color="green" radius={10} />)
            counter = counter + 1
        });

        if (this.state.redirect) {
            return <Redirect push={true} to={this.state.redirect} />
        }

        const CheckConnection = this.state.connected ? (
            <div>
                <Row>
                    <Col>
                        {this.state.planePos.lat.toFixed(4)} / {this.state.planePos.lat.toFixed(4)}
                    </Col>
                    <Col sm={6} className="text-right">
                        <label>
                            <Toggle
                                ref={(toggle) => { this.stickyToggleSwitch = toggle }}
                                checked={this.state.isMapSticky}
                                onChange={this.onStickyMap}
                                icons={{
                                    checked: <MdIconPack.MdAirplanemodeActive size={14} color="white" />,
                                    unchecked: null,
                                }} />
                        </label>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Map id="mainMap" ref={(map) => { if (map) this.map = map }}
                            onload={this.onLoad}
                            onmoveend={this.onMoveEnd}
                            onzoomend={this.onZoom}
                            ondragstart={this.onDragStart}
                            className="mapWindow"
                            center={this.state.centerPos}
                            zoom={this.state.zoom} >
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                            />

                            <RotatedMarker rotationAngle={this.state.flightData.heading} icon={planeIcon} position={this.state.planePos} />

                            {airportsMap}
                        </Map>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <ListGroup>
                            <ListGroupItemHeading>
                                Nearby Aiprots
                            </ListGroupItemHeading>
                            {rows}
                        </ListGroup>
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
