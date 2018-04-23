
declare class ExtPlaneJs {
    constructor(options: ExtPlaneJs.ExtPlaneJsOptions);

    //on(event: "loaded", callback: Function): this
    on(event: "data-ref", callback: (dataRef: string, value: any) => any): this
    on(event: string, callback: (error: Error | null, result: any | null) => void): this

    client: ExtPlaneJs.client
}

declare namespace ExtPlaneJs {

    interface client {
        interval(interval: number): void
        subscribe(dataRef: string): void
        disconnect(): void
    }

    interface ExtPlaneJsOptions {
        host: string
        port: number
        broadcast: boolean
        debug?: boolean
    }

}

declare module 'extplanejs' {
    import xpjs = ExtPlaneJs;
    export = xpjs;
}