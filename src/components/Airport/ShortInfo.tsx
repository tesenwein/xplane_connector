import * as React from "react"
import { Link } from 'react-router-dom'
import { AirportInterface } from "../../lib/Airport"
import "./ShortInfo.scss"


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
            <div className="row">
                <div className="col-sm-2">
                    {this.props.airport.icao}
                </div>
                <div className="col-sm">
                    {this.props.airport.name}
                </div>
                <div className="col-sm-1">
                    <Link to={{
                        pathname: "/airport/" + this.props.airport.icao
                    }}>Details</Link>
                </div>
            </div>
        );
    }
}
