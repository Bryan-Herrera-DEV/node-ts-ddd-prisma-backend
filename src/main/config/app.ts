import express, { Express } from "express";
import { ILogger } from "shared/providers/Logger/domain/ILogger";
export const setupApp = (logger: ILogger) => async (): Promise<Express> => {
    const app = express();

    const port = 3001;
    app.listen(
        port,
        () => logger.info(`Server is running at http://localhost:${port}/`)
    );
    return app;
};