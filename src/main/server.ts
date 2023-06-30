import { consoleLogger as ConsoleLogger } from "./../shared/providers/Logger/infraestructure/ConsoleLogger";
import { setupApp } from "./config/app";

setupApp(ConsoleLogger)();