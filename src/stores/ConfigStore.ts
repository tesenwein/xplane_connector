import { EventEmitter } from 'events';

export class ConfigStore extends EventEmitter {
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
}

const configStore = new ConfigStore();

/*
declare global {
    interface Window { configStore: any; }
}
window.configStore = configStore
*/

export default configStore;
