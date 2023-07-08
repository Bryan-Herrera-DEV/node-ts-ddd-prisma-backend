import { operatorEnum } from "@/shared/Types/IFilter";
import { IUserBase } from "../../domain/IUser";
import { TUserGetProfileUserCase } from "../../domain/IUserApplicationUserCases";

export const UserGetProfileUserCase: TUserGetProfileUserCase = (ResponserProvider, decode, FindUser) => async (req) => {
  try {
    const { id } = await decode(req.headers.authorization!.split(" ")[1]) as IUserBase & { iat: number };

    const { password, ...rest } = await FindUser([
      { field: "id", operator: operatorEnum.EQUAL, value: id },
    ]) as IUserBase;

    if (!rest || !password) {
      return ResponserProvider(404, "Profile Not Found", null);
    }

    return ResponserProvider(200, "User profile", rest);
  } catch (error) {
    if (error instanceof Error) {
      return ResponserProvider(400, error.message, null);
    }
  }
};
