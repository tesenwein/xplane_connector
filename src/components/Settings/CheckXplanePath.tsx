import * as React from "react";
import * as fs from "fs"
import { Alert } from "reactstrap"

import "./CheckXplanePath.scss"

import ConfigStore from "../../flux/stores/ConfigStore";

export interface CheckXplanePathProps {
}

export interface CheckXplanePathState {
  airportsExists: boolean
}

export default class CheckXplanePath extends React.Component<CheckXplanePathProps, CheckXplanePathState> {

  public constructor(props: CheckXplanePathProps) {
    super(props);

    this.state = {
      airportsExists: false
    }
  }

  public componentWillMount() {
    this.checkXplanePath()

    ConfigStore.on("change", () => {
      this.checkXplanePath()
    })

  }

  public checkXplanePath() {
    let check = fs.existsSync(ConfigStore.getConfig("xplane.path") + ConfigStore.getConfig("xplane.airports"))
    this.setState({ airportsExists: check })
  }

  public render() {

    return (
      <div className="row alertList">
        <div className="col-sm">
          {this.state.airportsExists &&
            <Alert color="success">Airports found</Alert>
          }
          {!this.state.airportsExists &&
            <Alert color="danger">Airports not found</Alert>
          }
        </div>
      </div>
    );
  }
}
