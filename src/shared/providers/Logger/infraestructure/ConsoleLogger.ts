import { ILogger, LogType } from "../domain/ILogger";
import { consoleLoggerImp } from "../application/ConsoleLog";

export const consoleLogger: ILogger = {
  log: (message: string): void => {
    consoleLoggerImp(LogType.LOG, message);
  },
  info: (message: string): void => {
    consoleLoggerImp(LogType.INFO, message);
  },
  warn: (message: string): void => {
    consoleLoggerImp(LogType.WARN, message);
  },
  error: (message: string): void => {
    consoleLoggerImp(LogType.ERROR, message);
  }
};