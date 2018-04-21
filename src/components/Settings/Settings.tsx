import * as React from "react";
import { remote } from "electron";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";

import ConfigStore from "../../lib/ConfigStore"
import Importer from "../../lib/Importer"

import CheckPath from "./CheckPath"

const dialog = remote.dialog;

export interface SettingsPathProps {
}

export interface SettingsPathState {
    xplanepath: string
    aiportsImported: string
    aiportsImportedDisabled: boolean
}


export class Settings extends React.Component<SettingsPathProps, SettingsPathState> {

    public constructor(props: any) {
        super(props);               
        this.onXlanePathSelect = this.onXlanePathSelect.bind(this);
    }

    public componentWillMount() {
        this.rebuildConfig();
    }

    public rebuildConfig() {
        this.setState({
            "xplanepath": ConfigStore.getConfig("xplane.path")
        })
    }

    public async onXlanePathSelect() {
        const result = await dialog.showOpenDialog({ properties: ["openDirectory"] });

        if (result.length == 1) {
            ConfigStore.setConfig("xplane.path", result[0])
            this.setState({xplanepath:result[0]})
        }
    }

    public async onAirportDataImport() {

        this.setState({ aiportsImported: "warning", aiportsImportedDisabled: true })
        Importer.loadAiprotData().then(() => {
            this.setState({ aiportsImported: "success" })
            setTimeout(() => {
                this.setState({ aiportsImported: "secondary", aiportsImportedDisabled: false })
            }, 3000)
        }).catch((e) => {
            console.log(e)
        })
    }

    public render() {
        return (
            <div>
                <div className="row">
                    <div className="col-sm">
                        <h4>Main Settings</h4>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm">
                        <CheckPath path={this.state.xplanepath + "/" + ConfigStore.getConfig("xplane.airports")} message="Airports Found" />
                        <Form>
                            <FormGroup>
                                <Label for="xplanepath">Path to X-Plane:</Label>
                                <Input
                                    type="text"
                                    name="xplanepath"
                                    id="xplanepath"
                                    onChange={() => { }}
                                    value={this.state.xplanepath}
                                />
                            </FormGroup>

                            <FormGroup>
                                <Button color="primary" onClick={this.onXlanePathSelect}>
                                    Select path
                                </Button>
                            </FormGroup>
                        </Form>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm">
                        <h4>Actions</h4>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm">
                        <Button disabled={this.state.aiportsImportedDisabled} color={this.state.aiportsImported} onClick={() => this.onAirportDataImport()}>Import Airports</Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Settings;
