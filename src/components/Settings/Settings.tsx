import * as React from 'react';
import { ConfigManager, ConfigRecordInterface } from '../../lib/ConfigManager';
import * as PouchDB from 'pouchdb';
import ConfigStore from '../../stores/ConfigStore';

import { remote } from 'electron';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

const dialog = remote.dialog;

export class Settings extends React.Component<any, any> {
    public constructor(props: any) {
        super(props);

        this.state = ConfigStore.getAll();
    }

    public componentWillMount() {
        ConfigStore.on('change', () => {
            this.setState(ConfigStore.getAll());
        });
    }

    public async onXlanePathSelect() {
        const result = await dialog.showOpenDialog({ properties: ['openDirectory'] });
        this.setState({ xplanepath: result[0] });

        const config: ConfigRecordInterface = {
            name: 'xplanepath',
            value: this.state.xplanepath
        };

        //ConfigManager.setConfig(config)
    }

    public render() {
        return (
            <Form>
                <FormGroup>
                    <Label for="xplanepath">Path to X-Plane:</Label>
                    <Input
                        type="text"
                        name="xplanepath"
                        id="xplanepath"
                        onChange={() => {}}
                        value={this.state.xplanepath}
                    />
                    <Button color="primary" onClick={() => this.onXlanePathSelect()}>
                        Select path
                    </Button>
                </FormGroup>
            </Form>
        );
    }
}

export default Settings;
