import * as React from 'react';
import { RouteComponentProps, Redirect } from "react-router";
import { Button } from "reactstrap"
import * as H from 'history';


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
        this.onClickBack = this.onClickBack.bind(this)
    }

    private onClickBack(){
        this.props.history.goBack()
    }

    public render() {


        return (
            <div>
                <Button onClick={this.onClickBack}>Back</Button>
                Details
            </div>
        );
    }
}
