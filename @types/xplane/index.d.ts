
type SpeedEvents = "data.airspeed"
type GlobalPositionEvents = "data.globalposition"

//export = XPlane;

interface XplaneOptions {
    port: XplaneOptionsPort
}

interface XplaneOptionsPort {
    in?: number
    out?: number
}

declare class XPlane {
    constructor(options: XplaneOptions);

    on(event: 'sentence', listener: (value: Buffer) => any): this;
    on(event: SpeedEvents, listener: (value: XPlane.Callbacks.SpeedsCallback) => any): this;
    on(event: GlobalPositionEvents, listener: (value: XPlane.Callbacks.GeoPosCallback) => any): this;

    listen(): void
}

declare namespace XPlane.Callbacks {
    interface SpeedsCallback {
        indicated: number
    }

    interface GeoPosCallback {
        lat: number
        lon: number
    }
}


declare module 'xplane' {
    import xp = XPlane;
    export = xp;
}
