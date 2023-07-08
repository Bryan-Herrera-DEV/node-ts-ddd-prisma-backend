import { operatorEnum } from "@/shared/Types/IFilter";
import { TUserLoginUserCase } from "../../domain/IUserApplicationUserCases";
import { IUserBase } from "../../domain/IUser";
import { Nullable } from "@/shared/Types/TNullable";

export const UserLoginUserCase: TUserLoginUserCase = (ResponserProvider, compare, createJwt, FindUser) => async (req) => {
  try {
    const user = await FindUser([
      {
        field: "email",
        value: req.body.email,
        operator: operatorEnum.EQUAL
      }
    ]);
    if (!user) {
      return ResponserProvider(404, "User not found", null);
    }
    const isMatch = await compare(req.body.password, user.password);

    if (!isMatch) {
      return ResponserProvider(400, "Invalid credentials", null);
    }
    const token = await createJwt<Nullable<IUserBase>>({
      id: user.id
    });

    return ResponserProvider(200, "User logged", { token });
  } catch (error) {
    if (error instanceof Error) {
      return ResponserProvider(400, error.message, null);
    }
  }
};
