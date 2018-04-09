import * as React from 'react';
import { remote } from 'electron';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

import ConfigStore from '../../flux/stores/ConfigStore';
import ConfigAction from '../../flux/actions/ConfigAction'


const dialog = remote.dialog;

export class Settings extends React.Component<any, any> {
    public constructor(props: any) {
        super(props);
        this.state = {}        
    }

    public componentWillMount() {
        
        this.rebuildConfig();
        
        ConfigStore.on('change', () => {
            this.rebuildConfig()
        });
    }

    public rebuildConfig(){

        this.setState({            
            'xplanepath' : ConfigStore.getConfig('xplane.path')            
        })
    }

    public async onXlanePathSelect() {
        const result = await dialog.showOpenDialog({ properties: ['openDirectory'] });
        ConfigAction.setConfig('xplane.path',result[0])
    }

    public render() {
        return (
            <Form inline>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Label className="mr-sm-2" for="xplanepath">Path to X-Plane:</Label>
                    <Input
                        type="text"
                        name="xplanepath"
                        id="xplanepath"
                        onChange={() => {}}
                        value={this.state.xplanepath}
                    />
                </FormGroup>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Button color="primary" onClick={() => this.onXlanePathSelect()}>
                        Select path
                    </Button>
                </FormGroup>
            </Form>
        );
    }
}

export default Settings;
