import request from "supertest";
import { ApplicationProvider } from "@/main/providers/ApplicationProvider";
import { consoleLogger } from "@/shared/providers/Logger/infraestructure/ConsoleLogger";

const app = ApplicationProvider(consoleLogger, true)();

describe("ErrorHandler", () => {
  it("Debe testear una ruta 404", async () => {
    const response = await request(app)
      .get("/unknown");
    expect(response.status).toBe(404); // Espera un estado HTTP 404 (NOT FOUND)
    expect(response.body.message).toEqual(`Path '/unknown' not found`);
  });

  it("Debe testear una ruta 500", async () => {
    const response = await request(app)
      .get("/err");
    expect(response.status).toBe(500); // Espera un estado HTTP 500 (INTERNAL SERVER ERROR)
    expect(response.body.message).toEqual(`Something went wrong`);
  });

  it("Debe testear un error de sintaxis", async () => {
    const response = await request(app)
      .get("/syntax-error");
    expect(response.status).toBe(400); // Espera un estado HTTP 400 (BAD REQUEST)
    expect(response.body.message).toEqual(`Invalid JSON`);
  });
  it("Debe testear un error de unauthorized", async () => {
    const response = await request(app)
      .get("/unauthorized-err");
    expect(response.status).toBe(401); // Espera un estado HTTP 401 (UNAUTHORIZED)
    expect(response.body.message).toEqual(`Invalid Token!`);
  });

  test("should handle custom errors for XHR requests", async () => {
    const response = await request(app)
      .get("/test-custom-error")
      .set('X-Requested-With', 'XMLHttpRequest');  // Simula una solicitud XHR

    expect(response.status).toBe(500);
    expect(response.body.message).toBe('Something went wrong');
  });
})
