import { StreamOptions } from 'morgan';

export default class Logger {
    private _tag: string
    constructor(tag: string) {
        this._tag = tag
    }
    //For success stream 
    public success(message: string | object): void {
        process.stdout.write(`\x1b[1m\x1b[32m [${this._tag}]  \x1b[0m`)
        console.log('\x1b[32m%s\x1b[0m', message)
    }
    //For information stream
    public info(message: string | object): void {
        process.stdout.write(`\x1b[1m\x1b[36m [${this._tag}]  \x1b[0m`)
        console.log('\x1b[36m%s\x1b[0m', message)
    }
    //For waring stream
    public warn(message: string | object): void {
        process.stdout.write(`\x1b[1m\x1b[33m [${this._tag}]  \x1b[0m`)
        console.log('\x1b[33m%s\x1b[0m', message)
    }
    //For error stream
    public error(message: string | object) {
        process.stdout.write(`\x1b[1m\x1b[31m [${this._tag}]  \x1b[0m`)
        console.log('\x1b[31m%s\x1b[0m', message)
    }
}

//Add logger for success stream
export class SuccessStream implements StreamOptions {
    write(line: string): void {
        const date: Date = new Date();
        new Logger(`${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`).success(line);
    }
}
//Add logger for error stream
export class ErrorStream implements StreamOptions {
    write(line: string): void {
        const date: Date = new Date();
        new Logger(`${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`).error(line);
    }
}
