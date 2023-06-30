export interface ILogger {
    log(message: string, ...optionalParams: unknown[]): void;
    info(message: string, ...optionalParams: unknown[]): void;
    warn(message: string, ...optionalParams: unknown[]): void;
    error(message: string, ...optionalParams: unknown[]): void;
}
export enum LogType {
    LOG = "LOG",
    INFO = "INFO",
    WARN = "WARN",
    ERROR = "ERROR"
}
export type IConsoleLoggerImp = (type: LogType, message: string) => void