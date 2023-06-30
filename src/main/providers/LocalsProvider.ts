import * as path from 'path';
import * as dotenv from 'dotenv';
import { Application } from 'express';

/**
 * Define Las configuraciones de la app
 */
const config = () => {
    dotenv.config({ path: path.join(__dirname, '../../../.env') });

    const port = process.env.PORT || 3000;
    const node_env = process.env.NODE_ENV || 'dev';
    const appSecret = process.env.APP_SECRET || '-QV.LlñvjQñÑñ8;5ñ#jyLñl;sY;jlyy8-;DjJYlDdddÑ@2Q;gd6;53d88;583@299QQ@Y3yqlÑqD+y';
    const api_prefix = process.env.API_PREFIX || 'api';

    return {
        port,
        node_env,
        appSecret,
        api_prefix
    };
};

/**
 * Inyecta la configuración de las variables de entorno
 */
const init = (_express: Application) => {
    _express.locals.app = config();
    return _express;
};

export { config, init };