import * as PouchDB from 'pouchdb';

export interface ConfigRecordInterface {
    name: string;
    value: any;
}

export class ConfigManager {
    static db = new PouchDB('config');

    public static async setConfig(config: ConfigRecordInterface) {
        const configJson: any = {};
        configJson[config.name] = config.value;

        return await ConfigManager.db.put(configJson);
    }

    public static async getConfig(config: string) {
        return await ConfigManager.db.get(config);
    }
}
