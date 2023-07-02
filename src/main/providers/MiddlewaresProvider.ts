import { Application } from "express";
import { ILogger } from "@/shared/providers/Logger/domain/ILogger";
import bodyParser from "body-parser";
import helmet from "helmet";
import cors from "cors";
import compress from "compression";

export const HttpMiddlewareProvider = (express: Application, logger: ILogger) => async (): Application => {
    logger.info("Loading HTTP middlewares...");
    // body-parser
    express.use(bodyParser.urlencoded({
        limit: "10mb",
        parameterLimit: 3000,
        extended: false
    }));

    express.use(bodyParser.json({
        limit: "10mb"
    }));

    // Seguridad con helmet
    express.use(helmet.xssFilter());
    express.use(helmet.noSniff());
    express.use(helmet.hidePoweredBy());
    express.use(helmet.frameguard({ action: "deny" }));
    express.use(helmet());


    // Habilita los CORS
    express.use(cors());

    // Desactivar la cabecera x-powered-by en la respuesta
    express.disable("x-powered-by");

    // Activa el validador de la carga útil de la solicitud Activa la compresión "gzip" / "deflate" para la respuesta
    express.use(compress());

    return express;
};