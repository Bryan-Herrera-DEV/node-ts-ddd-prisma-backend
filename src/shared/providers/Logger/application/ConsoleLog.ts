import { IConsoleLoggerImp } from "../domain/ILogger";

const LogType = {
    LOG: "[LOG]",
    INFO: "[INFO]",
    WARN: "[WARN]",
    ERROR: "[ERROR]"
};

const colorCodes = {
    RESET: '\x1b[0m',
    BLUE: '\x1b[34m',
    GREEN: '\x1b[32m',
    YELLOW: '\x1b[33m',
    RED: '\x1b[31m',
};

export const consoleLoggerImp: IConsoleLoggerImp = (type, message) => {
    let color = colorCodes.RESET;

    switch (type) {
        case 'LOG':
            color = colorCodes.BLUE;
            break;
        case 'INFO':
            color = colorCodes.GREEN;
            break;
        case 'WARN':
            color = colorCodes.YELLOW;
            break;
        case 'ERROR':
            color = colorCodes.RED;
            break;
    }
    console.log(`${color}${LogType[type]}${colorCodes.RESET} ${message}`);
};
