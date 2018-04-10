import { EventEmitter } from "events";
import dispatcher from "../dispatcher"
import { Dispatcher } from "flux";

import { DataManagerId, DataManagerInterface } from "../actions/DataManagerActions"

export class DataManagerStatic extends EventEmitter {
    
    public constructor() {
        super()
    }

    public loadData() {

        this.emit("change")
    }

    public handleActions(action:DataManagerInterface){
        
        switch(action.actionType){
            case DataManagerId.LOAD_DATA:{
                this.loadData()
            }
        }

    }
}

const DataManagerStore = new DataManagerStatic();

dispatcher.register(DataManagerStore.handleActions.bind(DataManagerStore))

export default DataManagerStore