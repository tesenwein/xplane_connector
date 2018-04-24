import * as React from 'react';
import ClosestAirports from "../Flight/ClosestAirports";
import InFlightMap from "../Flight/InFlightMap";
import CheckConnection from "../Settings/CheckConnection";
import "./InFlightInformation.scss";


export interface InFlightInformationUrlParams {
}

export interface InFlightInformationStates {

}

export interface InFlightInformationProps {

}

export default class InFlightInformation extends React.Component<InFlightInformationProps, InFlightInformationStates> {

    public constructor(props: InFlightInformationProps) {
        super(props)
    }

    public render() {
        return (
            <div>
                <CheckConnection />
                <ClosestAirports />
                <InFlightMap />
            </div>
        );
    }
}
