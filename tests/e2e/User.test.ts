import request from "supertest";
import express from "express";
import { register } from "@/main/providers/Routes/User.routes";
const app = express();
const router = express.Router();
app.use(express.json());
register(router);
app.use(router);

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
});
