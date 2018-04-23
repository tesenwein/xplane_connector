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

    public constructor(props: checkPathProps) {
        super(props);

        this.state = {
            xplaneConnected: XplaneEmmiter.connected
        }

        this.onReconnect = this.onReconnect.bind(this);
    }

    public componentWillMount() {
        XplaneEmmiter.on("connected", () => {
            this.setState({ xplaneConnected: true })
        })
        XplaneEmmiter.on("disconnected", () => {
            this.setState({ xplaneConnected: false })
        })
    }

    public onReconnect() {
        XplaneEmmiter.connect()
    }

    public render() {
        const XplaneConnectCheck = this.state.xplaneConnected ?
            (<div />) :
            (<Alert color="danger" onClick={this.onReconnect}>No XPlane connection found (Click to reconnect)</Alert>)

        return (
            <div>
                {XplaneConnectCheck}
            </div>
        );
    }
}
