import request from "supertest";
import { ApplicationProvider } from "@/main/providers/ApplicationProvider";
import { consoleLogger } from "@/shared/providers/Logger/infraestructure/ConsoleLogger";

const app = ApplicationProvider(consoleLogger, true)();

describe("POST /register", () => {

  const randomText = Math.random().toString(36).replace(/[^a-z]+/g, "").substr(0, 5);
  it("should register a new user", async () => {
    const response = await request(app)
      .post("/register")
      .send({
        email: `${randomText}test@example.com`,
        name: `${randomText}Test`,
        lastname: "User"
      });

    expect(response.status).toBe(201); // Espera un estado HTTP 201 (CREATED)
    expect(response.body.message).toEqual("User created");
  });

  it("should fail to register a new user with invalid email", async () => {
    const response = await request(app)
      .post("/register")
      .send({
        email: `${randomText}test@example.com`,
        name: `${randomText}Test`,
        lastname: "User"
      });
    expect(response.status).toBe(400); // Espera un estado HTTP 400 (BAD REQUEST)
  });

  it("should fail to register a new user with invalid name", async () => {
    const response = await request(app)
      .post("/register")
      .send({
        email: ``
      });
    expect(response.status).toBe(400); // Espera un estado HTTP 400 (BAD REQUEST)
  });
});
