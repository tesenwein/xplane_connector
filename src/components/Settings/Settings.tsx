import * as React from 'react';
import * as PouchDB from 'pouchdb';
import { remote } from 'electron';
import { ConfigManager, ConfigRecordInterface } from '../../lib/ConfigManager';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

import ConfigStore from '../../flux/stores/ConfigStore';
import ConfigAction from '../../flux/actions/ConfigActions'


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
        ConfigAction.setConfig('xplanepath',result[0])
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
