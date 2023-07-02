declare namespace NodeJS {
    interface ProcessEnv {
        PORT: string;
        NODE_ENV: "dev" | "prod";
        APP_SECRET: string;
        API_PREFIX: string;
    }
}