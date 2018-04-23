import * as fs from "fs";
import * as React from "react";
import { Alert } from "reactstrap";
import ConfigStore from "../../lib/ConfigStore";
import "./CheckPath.scss";


export interface checkPathProps {
    path: string
    message: string
}

export interface checkPathState {
    path: string
    pathExists: boolean
}

export default class CheckPath extends React.Component<checkPathProps, checkPathState> {

    public constructor(props: checkPathProps) {
        super(props);

        this.state = {
            path: props.path,
            pathExists: false
        }
    }

    public componentWillMount() {
        this.checkPath(this.state.path)
    }

    public componentWillReceiveProps(props: checkPathProps) {
        this.setState({ path: props.path })
        this.checkPath(props.path)
    }

    public checkPath(path: string) {
        const check = fs.existsSync(path)
        this.setState({ pathExists: check })
    }

    public render() {

        return (
            <div className="row alertList">
                <div className="col-sm">
                    {this.state.pathExists &&
                        <Alert color="success">{this.props.message}</Alert>
                    }
                    {!this.state.pathExists &&
                        <Alert color="danger">{this.props.message}</Alert>
                    }
                </div>
            </div>
        );
    }
}
