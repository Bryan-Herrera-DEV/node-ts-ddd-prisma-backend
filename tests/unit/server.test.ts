import { ApplicationProvider, stopServer } from "@/main/providers/ApplicationProvider";
import { disconnect } from "@/main/providers/RedisProvider";
import { consoleLogger } from "@/shared/providers/Logger/infraestructure/ConsoleLogger";

describe("ApplicationProvider", () => {
  beforeEach(() => {
    // Interceptar la salida de consola
    jest.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    // Restaurar la implementación original de console.log
    jest.spyOn(console, "log").mockRestore();
  });
  it("debe retornar una instancia de express", async () => {
    const applicationProvider = ApplicationProvider(consoleLogger)();
    expect(applicationProvider).toBeDefined();
  });
});

afterAll(async () => {
  await stopServer();
  await disconnect()
});
