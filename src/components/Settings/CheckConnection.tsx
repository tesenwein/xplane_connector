import * as fs from "fs";
import * as React from "react";
import { Alert } from "reactstrap";
import ConfigStore from "../../lib/ConfigStore";
import { XplaneEmmiter } from "../../lib/XplaneConnector";

export interface checkPathProps {
}

export interface checkPathState {
    xplaneConnected: boolean
}

export default class CheckPath extends React.Component<checkPathProps, checkPathState> {

    private compontentMounted = false;

    public constructor(props: checkPathProps) {
        super(props);

        this.state = {
            xplaneConnected: XplaneEmmiter.connected
        }

    }

    public componentWillMount() {

        this.compontentMounted = true

        XplaneEmmiter.on("connectionchange", () => {
            if (this.compontentMounted) {
                this.setState({ xplaneConnected: XplaneEmmiter.connected })
            }
        })
    }

    public componentWillUnmount() {
        this.compontentMounted = false
    }

    public render() {
        const XplaneConnectCheck = this.state.xplaneConnected ?
            (<div />) :
            (<Alert color="info">No X-Plane connection found. Reconnecting...</Alert>)

        return (
            <div>
                {XplaneConnectCheck}
            </div>
        );
    }
}
