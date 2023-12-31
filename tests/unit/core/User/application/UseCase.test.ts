import { UserRegisterUserCase } from "@/core/User/application/UseCases/UserRegisterUserCase";
import { StatusCodes } from "http-status-codes";
import { hashProvider } from "@/shared/providers/HashProvider/infraestructure/hashprovider";
import { hash } from "bcrypt";

import { Request } from "express";
import { disconnect } from "@/main/providers/RedisProvider";

describe("UserRegisterUserCase", () => {
  let ResponseLoggerMock: jest.Mock;
  let saveUserImpMock: jest.Mock;

  beforeAll(() => {
    // Crear los mocks
    ResponseLoggerMock = jest.fn();
    saveUserImpMock = jest.fn();
  });

  it("should save the user and log the response", async () => {
    // Crear el caso de uso con los mocks
    const UserRegister = UserRegisterUserCase(ResponseLoggerMock, hashProvider(hash), saveUserImpMock);

    // Simular una petición
    const mockReq = {
      body: {
        name: "test",
        email: "test@test.com",
        lastname: "test lastname",
        password: "test password",
      }
    };

    await UserRegister(mockReq as unknown as Request);

    // Verificar que saveUserImpMock fue llamado con los datos correctos
    expect(saveUserImpMock).toHaveBeenCalledWith(expect.objectContaining(mockReq.body));

    // Verificar que ResponseLoggerMock fue llamado con los argumentos correctos
    expect(ResponseLoggerMock).toHaveBeenCalledWith(StatusCodes.CREATED, "User created", null);
  });

  it("should log the error if an exception is thrown", async () => {
    const error = new Error("test error");

    // Crear el caso de uso con los mocks
    const UserRegister = UserRegisterUserCase(ResponseLoggerMock, hashProvider(hash), saveUserImpMock);

    // Hacer que saveUserImpMock lance una excepción
    saveUserImpMock.mockRejectedValueOnce(error);

    // Simular una petición
    const mockReq: unknown = {
      body: {
        name: "test",
        email: "test@test.com",
        lastname: "test lastname",
        password: "test password",
      }
    };

    await UserRegister(mockReq as unknown as Request);

    // Verificar que ResponseLoggerMock fue llamado con los argumentos correctos
    expect(ResponseLoggerMock).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST, error.message, null);
  });
});
afterAll(async () => {
  await disconnect()
});
