import * as debug from "debug"

export default class Debug{

    public static log(msg:string){

        const log = debug('app:log');
        log(msg)
    }


    public static warn(msg:string){

        const warn = debug('app:warning');
        warn(msg)
    }


    public static error(msg:string){

        const error = debug('app:error');
        error(msg)
    }
}