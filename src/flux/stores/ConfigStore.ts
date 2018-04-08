import { EventEmitter } from 'events';
import dispatcher from '../dispatcher'
import { Dispatcher } from 'flux';

import { ConfigID, SetConfigInterface } from '../actions/ConfigActions'

export class ConfigStoreStatic extends EventEmitter {
    private configs: any = {};

    public constructor() {
        super();

        this.configs = {
            xplanepath: 'C:\\X-Plane 11'
        };
    }

    public setConfig(name: string, value: any) {
        this.configs[name] = value;
        this.emit('change');
    }

    public getAll() {
        return this.configs;
    }

    public handleActions(action:SetConfigInterface){
        
        switch(action.actionType){
            case ConfigID.SET_CONFIG_VALUE:{
                this.setConfig(action.id, action.value)
            }
        }

    }
}

const configStore = new ConfigStoreStatic();

dispatcher.register(configStore.handleActions.bind(configStore))

export default configStore