import express, { Express } from "express";
import { ILogger } from "@/shared/providers/Logger/domain/ILogger";
import { HttpMiddlewareProvider } from "./MiddlewaresProvider";
import Router from "express-promise-router";
import { init as initLocals } from "./LocalsProvider";
import { RegisterRoutes } from "./RouterProvider";
import ErrorHandlerProvider from "./ErrorHandlerProvider";
let httpServer: Express;

export const ApplicationProvider = (logger: ILogger, inTest = false) => (): Promise<Express> => {
  const app = express();
  const router = Router();

  initLocals(app);
  HttpMiddlewareProvider(app, logger)();

  app.use(router);
  RegisterRoutes(router);

  app.use(ErrorHandlerProvider.syntaxErrorHandler());
  app.use(ErrorHandlerProvider.notFoundHandler());
  app.use(ErrorHandlerProvider.clientErrorHandler());
  app.use(ErrorHandlerProvider.errorHandler());

  const port = process.env.PORT;
  if (!inTest) {
    httpServer = app.listen(
      port,
      () => logger.info(`Server is running at http://localhost:${port}/`)
    );
  }
  return app;
};

export const stopServer = async (): Promise<void> => {
  // Detener el servidor Express si está en ejecución
  if (httpServer) {
    await new Promise<void>((resolve, reject) => {
      httpServer.close((err) => {
        if (err) {
          console.error("Error al detener el servidor Express:", err);
          reject(err);
        } else {
          console.log("Servidor Express detenido");
          resolve();
        }
      });
    });
  }
};
