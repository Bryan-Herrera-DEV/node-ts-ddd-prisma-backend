import { operatorEnum } from "@/shared/Types/IFilter";
import { IUserBase } from "../../domain/IUser";
import { TUserGetProfileUserCase } from "../../domain/IUserApplicationUserCases";

export const UserGetProfileUserCase: TUserGetProfileUserCase = (ResponserProvider, decode, FindUser) => async (req) => {
  try {
    const { id } = await decode(req.headers.authorization!.split(" ")[1]) as IUserBase & { iat: number };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...rest } = await FindUser([
      { field: "id", operator: operatorEnum.EQUAL, value: id },
    ]) as IUserBase;

    return ResponserProvider(200, "User profile", rest);
  } catch (error) {
    if (error instanceof Error) {
      return ResponserProvider(400, error.message, null);
    }
  }
};
