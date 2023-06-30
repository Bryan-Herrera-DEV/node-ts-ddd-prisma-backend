import express, { Express } from "express";
import { ILogger } from "../../shared/providers/Logger/domain/ILogger";
import { HttpMiddlewareProvider } from "./MiddlewaresProvider";
import { init as initLocals } from "./LocalsProvider";

export const ApplicationProvider = (logger: ILogger) => async (): Promise<Express> => {
    const app = express();

    initLocals(app);
    await HttpMiddlewareProvider(app, logger)();

    const port = process.env.PORT;
    app.listen(
        port,
        () => logger.info(`Server is running at http://localhost:${port}/`)
    );
    return app;
};