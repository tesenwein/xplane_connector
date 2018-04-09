import { EventEmitter } from "events";
import dispatcher from "../dispatcher"
import { Dispatcher } from "flux";
import * as Configstore from "configstore";

import { ConfigID, SetConfigInterface } from "../actions/ConfigAction"

export class ConfigStoreStatic extends EventEmitter {
    

    private store:Configstore;

    public constructor() {
        super()
        this.store = new Configstore("xplane-connector-main")
    }

    public setConfig(name: string, value: any) {
        this.store.set(name, value)
        this.emit("change")
    }
    
    public getConfig(name:string){
        return this.store.get(name)
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