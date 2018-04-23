import { remote } from "electron";
import * as React from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import Airport from "../../lib/Airport";
import AirportIndex from "../../lib/AirportIndex";
import ConfigStore from "../../lib/ConfigStore";
import Importer from "../../lib/Importer";
import CheckPath from "./CheckPath";


const dialog = remote.dialog;

export interface SettingsPathProps {
}

export interface SettingsPathState {
    xplanepath: string
    aiportsImported: string
    aiportsCleaned: string
    actionsDisabled: boolean
}


export class Settings extends React.Component<SettingsPathProps, SettingsPathState> {

    public constructor(props: any) {
        super(props);
        this.onXlanePathSelect = this.onXlanePathSelect.bind(this);
        this.onAirportDataImport = this.onAirportDataImport.bind(this);
        this.onAirportDataClean = this.onAirportDataClean.bind(this);
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

        if (result.length === 1) {
            ConfigStore.setConfig("xplane.path", result[0])
            this.setState({ xplanepath: result[0] })
        }
    }

    public async onAirportDataImport() {

        this.setState({ aiportsImported: "warning", actionsDisabled: true })

        await Importer.loadAiprotData()
        await AirportIndex.build()

        this.setState({ aiportsImported: "success" })
        setTimeout(() => {
            this.setState({ aiportsImported: "secondary", actionsDisabled: false })
        }, 3000)

    }

    public async onAirportDataClean() {

        this.setState({ aiportsCleaned: "warning", actionsDisabled: true })

        await Airport.cleanDatabase()
        await AirportIndex.build()

        this.setState({ aiportsCleaned: "success" })
        setTimeout(() => {
            this.setState({ aiportsCleaned: "secondary", actionsDisabled: false })
        }, 3000)

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
                        <Button disabled={this.state.actionsDisabled} color={this.state.aiportsImported} onClick={this.onAirportDataImport}>Import Airports</Button>
                    </div>
                    <div className="col-sm">
                        <Button disabled={this.state.actionsDisabled} color={this.state.aiportsCleaned} onClick={this.onAirportDataClean}>Clean Airports</Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Settings;
