import { TUserRegisterUserCase } from "../../domain/IUserApplicationUserCases";
import { StatusCodes } from "http-status-codes";

export const UserRegisterUserCase: TUserRegisterUserCase = (ResponseLogger, saveUserImp) => async (req) => {
  try {
    req.body.createdAt = new Date();
    req.body.updatedAt = new Date();
    await saveUserImp(req.body);
    ResponseLogger(StatusCodes.CREATED, "User created", null);
  } catch (error) {
    if (error instanceof Error) {
      ResponseLogger(StatusCodes.BAD_REQUEST, error.message, null);
    }
  }
};

