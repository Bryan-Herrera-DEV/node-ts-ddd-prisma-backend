import { stopServer, server } from "@/main/providers/ApplicationProvider";

describe("stopServer", () => {
  beforeEach(() => {
    jest.spyOn(console, "log").mockImplementation(() => {});
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.spyOn(console, "log").mockRestore();
    jest.spyOn(console, "error").mockRestore();
  });

  it("debe detener el servidor si está en ejecución", async () => {
    server.httpServer = { close: jest.fn().mockImplementation((callback) => callback()) } as any;
    await stopServer();
    expect(server.httpServer!.close).toBeCalled();
    expect(console.log).toBeCalledWith("Servidor Express detenido");
  });

  it("debe manejar un error al detener el servidor", async () => {
    const error = new Error("Error al detener el servidor Express");
    server.httpServer = { close: jest.fn().mockImplementation((callback) => callback(error)) } as any;
    try {
      await stopServer();
    } catch (err) {
      expect(err).toEqual(error);
    }
    expect(server.httpServer!.close).toBeCalled();
    expect(console.error).toBeCalledWith("Error al detener el servidor Express:", error);
  });

  it("no debe hacer nada si el servidor no está en ejecución", async () => {
    server.httpServer = null;
    await stopServer();
    expect(console.log).not.toBeCalled();
  });
});
