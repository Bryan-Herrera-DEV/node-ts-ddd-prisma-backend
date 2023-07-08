import request from "supertest";
import { ApplicationProvider } from "@/main/providers/ApplicationProvider";
import { consoleLogger } from "@/shared/providers/Logger/infraestructure/ConsoleLogger";
import { UserGetProfileUserCase } from "@/core/User/application/UseCases/UserGetProfileUserCase";
import { TResponseLoggerImp } from "@/shared/providers/Response/domain/IResponse";
import { Response } from "express";
import { UserLoginUserCase } from "@/core/User/application/UseCases/UserLoginUserCase";

const app = ApplicationProvider(consoleLogger, true)();
const randomText = Math.random().toString(36).replace(/[^a-z]+/g, "");
const mockUser = {
  email: `${randomText}test@example.com`,
  name: `${randomText}Test`,
  lastname: "User",
  password: "Password",
}
let JWT = "";
describe("POST /register", () => {
  it("should register a new user", async () => {
    const response = await request(await app)
      .post("/register")
      .send(mockUser);

    expect(response.status).toBe(201); // Espera un estado HTTP 201 (CREATED)
    expect(response.body.message).toEqual("User created");
  });

  it("should fail to register a new user with invalid email", async () => {
    const response = await request(await app)
      .post("/register")
      .send({
        email: `${randomText}test@example.com`,
        name: `${randomText}Test`,
        lastname: "User"
      });
    expect(response.status).toBe(400); // Espera un estado HTTP 400 (BAD REQUEST)
  });

  it("should fail to register a new user with invalid name", async () => {
    const response = await request(await app)
      .post("/register")
      .send({
        email: ``
      });
    expect(response.status).toBe(400); // Espera un estado HTTP 400 (BAD REQUEST)
  });
});

describe("POST /login", () => {
  it("should login user", async () => {
    const response = await request(await app)
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
    const response = await request(await app)
      .post("/login")
      .send({
        email: mockUser.email,
        password: "invalid"
      });
    expect(response.status).toBe(400); // Espera un estado HTTP 400 (BAD REQUEST)
  });
  it("should fail to login user with invalid params", async () => {
    const response = await request(await app)
      .post("/login")
      .send();
    expect(response.status).toBe(400); // Espera un estado HTTP 400 (BAD REQUEST)
  });
  it("should fail to find user", async () => {
    const response = await request(await app)
      .post("/login")
      .send({
        email: "invalid@gmail.com",
        password: "invalid"
      });
    expect(response.status).toBe(404); // Espera un estado HTTP 400 (BAD REQUEST)
  });
  it("should fail access protected route", async () => {
    const response = await request(await app)
      .get("/get-my-profile")
      .set('Authorization', `Bearer ${JWT}failed`);

    expect(response.status).toBe(401);
  });
  it("should access protected route", async () => {
    const response = await request(await app)
      .get("/get-my-profile")
      .set('Authorization', `Bearer ${JWT}`)

    expect(response.status).toBe(200);
  });

  it("should handle errors during token decoding", async () => {
    const mockResponserProvider: TResponseLoggerImp = (status, message, data) => {
      return {
        status,
        message,
        data
      } as unknown as Response<any, Record<string, any>>
    };
    const mockDecode = jest.fn(() => {
      throw new Error('Decode error');
    });
    const mockFindUser = jest.fn();
    const mockCompare = jest.fn();
    const req = {
      headers: {
        authorization: "Bearer " + JWT
      }
    };

    const result = await UserLoginUserCase(mockResponserProvider, mockCompare, mockDecode, mockFindUser)(req as any);

    expect(result!.status).toBe(400);
  });
});

describe("GET /get-my-profile", () => {
  it("should get user profile", async () => {
    const response = await request(await app)
      .get("/get-my-profile")
      .set('Authorization', `Bearer ${JWT}`)

    expect(response.status).toBe(200);
  });
  it("should fail to get user profile", async () => {
    const response = await request(await app)
      .get("/get-my-profile")
      .set('Authorization', `Bearer ${JWT}failed`);

    expect(response.status).toBe(401);
  });
  it("should handle errors during token decoding", async () => {
    const mockResponserProvider: TResponseLoggerImp = (status, message, data) => {
      return {
        status,
        message,
        data
      } as unknown as Response<any, Record<string, any>>
    };
    const mockDecode = jest.fn(() => {
      throw new Error('Decode error');
    });
    const mockFindUser = jest.fn();
    const req = {
      headers: {
        authorization: "Bearer " + JWT
      }
    };

    const result = await UserGetProfileUserCase(mockResponserProvider, mockDecode, mockFindUser)(req as any);

    expect(result!.status).toBe(400);
  });
});
