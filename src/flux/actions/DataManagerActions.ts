import Dispatcher from "../dispatcher"

export enum DataManagerId {
    LOAD_DATA
}

export interface DataManagerInterface{
    actionType: DataManagerId
}

class DataManagerActionsStatic {

    public loadData(id:any, value:any){
        Dispatcher.dispatch(<DataManagerInterface>{
            actionType : DataManagerId.LOAD_DATA
        })
    }
}

const DataManager = new DataManagerActionsStatic();

export default DataManager;