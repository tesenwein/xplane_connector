
import * as Configstore from "configstore";



class ConfigStoreStatic {

    store = new Configstore("xplane-connector-main");

    public setConfig(name: string, value: any) {
        this.store.set(name, value)
    }

    public getConfig(name: string) {
        return this.store.get(name)
    }

}


const ConfigStore = new ConfigStoreStatic()
export default ConfigStore
