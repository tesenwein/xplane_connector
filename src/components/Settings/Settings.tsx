import * as React from "react";
import { remote } from "electron";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";

import ConfigStore from "../../flux/stores/ConfigStore"
import ConfigAction from "../../flux/actions/ConfigAction"
import Importer from "../../lib/Importer"

import CheckXplanePath from "./CheckXplanePath"

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
    }

    public componentWillMount() {

        this.rebuildConfig();

        ConfigStore.on("change", () => {
            this.rebuildConfig()
        });
    }

    public rebuildConfig() {

        this.setState({
            "xplanepath": ConfigStore.getConfig("xplane.path")
        })
    }

    public async onXlanePathSelect() {
        const result = await dialog.showOpenDialog({ properties: ["openDirectory"] });

        if (result.length == 1) {
            ConfigAction.setConfig("xplane.path", result[0])
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
                        <CheckXplanePath />
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
                                <Button color="primary" onClick={() => this.onXlanePathSelect()}>
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
