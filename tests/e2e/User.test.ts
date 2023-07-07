import request from "supertest";
import { ApplicationProvider } from "@/main/providers/ApplicationProvider";
import { consoleLogger } from "@/shared/providers/Logger/infraestructure/ConsoleLogger";

const app = ApplicationProvider(consoleLogger, true)();
const randomText = Math.random().toString(36).replace(/[^a-z]+/g, "");
const mockUser = {
  email: `${randomText}test@example.com`,
  name: `${randomText}Test`,
  lastname: "User",
  password: "Password",
}



describe("POST /register", () => {
  it("should register a new user", async () => {
    const response = await request(app)
      .post("/register")
      .send(mockUser);

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

describe("POST /login", () => {
  let JWT = "";
  it("should login user", async () => {
    const response = await request(app)
      .post("/login")
      .send({
        email: mockUser.email,
        password: mockUser.password
      });

    expect(response.status).toBe(200); // Espera un estado HTTP 201 (CREATED)
    expect(response.body.message).toEqual("User logged");
    JWT = response.body.data.token;
  });

  it("should fail to login user with invalid credentials", async () => {
    const response = await request(app)
      .post("/login")
      .send({
        email: mockUser.email,
        password: "invalid"
      });
    expect(response.status).toBe(400); // Espera un estado HTTP 400 (BAD REQUEST)
  });
  it("should fail to login user with invalid params", async () => {
    const response = await request(app)
      .post("/login")
      .send();
    expect(response.status).toBe(400); // Espera un estado HTTP 400 (BAD REQUEST)
  });
  it("should fail to find user", async () => {
    const response = await request(app)
      .post("/login")
      .send({
        email: "invalid@gmail.com",
        password: "invalid"
      });
    expect(response.status).toBe(404); // Espera un estado HTTP 400 (BAD REQUEST)
  });
  it("should fail access protected route", async () => {
    const response = await request(app)
      .get("/test-two")
      .set('Authorization', `Bearer ${JWT}failed`);

    expect(response.status).toBe(401);
  });
  it("should access protected route", async () => {
    const response = await request(app)
      .get("/test-two")
      .set('Authorization', `Bearer ${JWT}`)

    expect(response.status).toBe(200);
  });
});
