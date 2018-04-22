import * as React from "react";
import { Link } from 'react-router-dom';
import { Col, Row } from "reactstrap";
import { AirportInterface } from "../../lib/Airport";
import "./ShortInfo.scss";


export interface ShortInfoProps {
    key: any
    airport: AirportInterface
}

export interface ShortInfoState {
}

export default class ShortInfo extends React.Component<ShortInfoProps, ShortInfoState> {

    public constructor(props: ShortInfoProps) {
        super(props);
    }

    public render() {

        return (
            <Row>
                <Col sm="1">
                    {this.props.airport.icao}
                </Col>
                <Col sm="10">
                    {this.props.airport.name}
                </Col>
                <Col sm="1">
                    <Link to={{
                        pathname: "/airport/" + this.props.airport.icao
                    }}>Details</Link>
                </Col>
            </Row>
        );
    }
}
