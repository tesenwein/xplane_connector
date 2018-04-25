import * as React from 'react';
import { RouteComponentProps } from "react-router";



export interface DetailsUrlParams{
    icao:string
}

export interface DetailsStates {
}

export interface DetailsProps extends RouteComponentProps<DetailsUrlParams> {
    id:string
}

export default class Details extends React.Component<DetailsProps, DetailsStates> {

    public constructor(props:DetailsProps){
        super(props)

        console.log(this.props.match.params.icao)
    }

    public render() {

        

        return (
            <div>
                Details
            </div>
        );
    }
}
