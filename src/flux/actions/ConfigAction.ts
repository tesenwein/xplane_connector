import Dispatcher from '../dispatcher'

export enum ConfigID {
    SET_CONFIG_VALUE,
    GET_CONFIG
}

export interface SetConfigInterface{
    actionType: ConfigID,
    id: string,
    value: any
}

class ConfigActionStatic {

    public setConfig(id:any, value:any){
        Dispatcher.dispatch(<SetConfigInterface>{
            actionType : ConfigID.SET_CONFIG_VALUE,
            id: id,
            value: value
        })
    }
}

const ConfigAction = new ConfigActionStatic();

export default ConfigAction;