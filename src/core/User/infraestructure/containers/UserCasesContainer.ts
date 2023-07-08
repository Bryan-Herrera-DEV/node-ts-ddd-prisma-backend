import { hash, compare } from "bcrypt";
import { hashProvider, compareProvider } from "@/shared/providers/HashProvider/infraestructure/hashprovider";
import { ResponseProvider } from "@/shared/providers/Response/infraestructure/Response";
import { CreateJwtProvider } from "@/shared/providers/JwtProvider/infraestructure/JwtProvider";
import { UserLoginUserCase } from "@/core/User/application/UseCases/UserLoginUserCase";

import { UserRegisterUserCase } from "../../application/UseCases/UserRegisterUserCase";
import { Request, Response } from "express";
import { UserRespositorysContainer } from "./UserRespositorysContainer";
import { UserGetProfileUserCase } from "../../application/UseCases/UserGetProfileUserCase";
import { decode } from "jsonwebtoken";

const jwtImp = CreateJwtProvider();

export const UserCasesContainer = {
  userRegisterUserCase: (req: Request, res: Response) =>
    UserRegisterUserCase(ResponseProvider(res), hashProvider(hash), UserRespositorysContainer.saveUserImp)(req),
  userLoginUserCase: (req: Request, res: Response) =>
    UserLoginUserCase(ResponseProvider(res), compareProvider(compare), jwtImp, UserRespositorysContainer.findUserImp)(req),
  userGetProfileUserCase: (req: Request, res: Response) =>
    UserGetProfileUserCase(ResponseProvider(res), decode, UserRespositorysContainer.findUserImp)(req)
};
