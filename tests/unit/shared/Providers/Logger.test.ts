import { consoleLogger } from "@/shared/providers/Logger/infraestructure/ConsoleLogger";

describe("ConsoleLogger", () => {
  beforeEach(() => {
    // Interceptar la salida de consola
    jest.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    // Restaurar la implementación original de console.log
    jest.spyOn(console, "log").mockRestore();
  });

  it("debe retornar una instancia de ConsoleLogger", async () => {
    expect(consoleLogger).toBeDefined();
  });

  it("debe test de LOG", async () => {
    const logger = consoleLogger;
    logger.log("Log");
    expect(console.log).toHaveBeenCalledWith("\x1b[34m[LOG]\x1b[0m Log");
  });
  it("debe test de INFO", async () => {
    const logger = consoleLogger;
    logger.info("Info");
    expect(console.log).toHaveBeenCalledWith("\x1b[32m[INFO]\x1b[0m Info");
  });
  it("debe test de WARN", async () => {
    const logger = consoleLogger;
    logger.warn("Warn");
    expect(console.log).toHaveBeenCalledWith("\x1b[33m[WARN]\x1b[0m Warn");
  });
  it("debe test de ERROR", async () => {
    const logger = consoleLogger;
    logger.error("Error");
    expect(console.log).toHaveBeenCalledWith("\x1b[31m[ERROR]\x1b[0m Error");
  });
});
