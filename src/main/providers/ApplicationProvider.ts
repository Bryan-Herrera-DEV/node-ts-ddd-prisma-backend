import express, { Express } from "express";
import { ILogger } from "@/shared/providers/Logger/domain/ILogger";
import { HttpMiddlewareProvider } from "./MiddlewaresProvider";
import Router from 'express-promise-router';
import { init as initLocals } from "./LocalsProvider";
import { RegisterRoutes } from "./RouterProvider";

export const ApplicationProvider = (logger: ILogger) => async (): Promise<Express> => {
    const app = express();
    const router = Router();

    initLocals(app);
    await HttpMiddlewareProvider(app, logger)();
    
    app.use(router);
    RegisterRoutes(router);

    const port = process.env.PORT;
    app.listen(
        port,
        () => logger.info(`Server is running at http://localhost:${port}/`)
    );
    return app;
};