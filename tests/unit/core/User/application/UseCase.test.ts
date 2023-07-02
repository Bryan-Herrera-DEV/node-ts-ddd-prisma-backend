import { UserRegisterUserCase } from '@/core/User/application/UseCases/UserRegisterUserCase';
import { StatusCodes } from 'http-status-codes';

describe('UserRegisterUserCase', () => {
  let ResponseLoggerMock: jest.Mock;
  let saveUserImpMock: jest.Mock;

  beforeAll(() => {
    // Crear los mocks
    ResponseLoggerMock = jest.fn();
    saveUserImpMock = jest.fn();
  });

  it('should save the user and log the response', async () => {
    // Crear el caso de uso con los mocks
    const UserRegister = UserRegisterUserCase(ResponseLoggerMock, saveUserImpMock);

    // Simular una petición
    const mockReq: any = {
      body: {
        name: "test",
        email: "test@test.com",
        lastname: "test lastname",
        password: "test password",
      }
    };

    await UserRegister(mockReq);

    // Verificar que saveUserImpMock fue llamado con los datos correctos
    expect(saveUserImpMock).toHaveBeenCalledWith(expect.objectContaining(mockReq.body));

    // Verificar que ResponseLoggerMock fue llamado con los argumentos correctos
    expect(ResponseLoggerMock).toHaveBeenCalledWith(StatusCodes.CREATED, 'User created', null);
  });

  it('should log the error if an exception is thrown', async () => {
    const error = new Error('test error');

    // Crear el caso de uso con los mocks
    const UserRegister = UserRegisterUserCase(ResponseLoggerMock, saveUserImpMock);

    // Hacer que saveUserImpMock lance una excepción
    saveUserImpMock.mockRejectedValueOnce(error);

    // Simular una petición
    const mockReq: any = {
      body: {
        name: "test",
        email: "test@test.com",
        lastname: "test lastname",
        password: "test password",
      }
    };

    await UserRegister(mockReq);

    // Verificar que ResponseLoggerMock fue llamado con los argumentos correctos
    expect(ResponseLoggerMock).toHaveBeenCalledWith(StatusCodes.INTERNAL_SERVER_ERROR, error.message, null);
  });
});
