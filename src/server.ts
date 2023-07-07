import { consoleLogger as ConsoleLogger } from "./shared/providers/Logger/infraestructure/ConsoleLogger";
import { ApplicationProvider } from "./main/providers/ApplicationProvider";

import("tsconfig-paths").then(({ register }) => {
    register({
        baseUrl: __dirname,
        paths: { "@/*": ["*"] },
        addMatchAll: false,
    });
})
.then(() => {ApplicationProvider(ConsoleLogger)();});
