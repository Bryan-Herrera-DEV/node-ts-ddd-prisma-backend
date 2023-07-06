import { UserRegisterUserCase } from "@/core/User/application/UseCases/UserRegisterUserCase";
import { PrismaUserRepository } from "@/core/User/infraestructure/repositorys/PrismaUserRepository";
import { SaveUser } from "@/core/User/application/repositoryImplementations/SaveUser";
import { FindUser } from "@/core/User/application/repositoryImplementations/FindUser";
import { Request, Response, Router } from "express";
import { hash, compare } from "bcrypt";

import { PrismaProvider } from "../PrismaProvider";
import { ResponseProvider } from "@/shared/providers/Response/infraestructure/Response";
import { hashProvider, compareProvider } from "@/shared/providers/HashProvider/infraestructure/hashprovider";

import { UserRegisterDto } from "@/core/User/infraestructure/DTOs/UserRegisterDto";
import { UserLoginDto } from "@/core/User/infraestructure/DTOs/UserLoginDto";
import { UserLoginUserCase } from "@/core/User/application/UseCases/UserLoginUserCase";
import { CreateJwtProvider } from "@/shared/providers/JwtProvider/infraestructure/JwtProvider";
import { passportUserMiddleware } from "@/shared/PassportProvider/infraestructure/passportConfig";

const repository = PrismaUserRepository(PrismaProvider);
const saveUserImp = SaveUser(repository);
const findUserImp = FindUser(repository);
const jwtImp = CreateJwtProvider();

export const register = (router: Router) => {
  if (process.env.NODE_ENV !== "prod") {
    router.get("/err", function (_, __, ___) {
      throw new Error("keyboard cat!");
    });
    router.get("/syntax-error", function (_, __, ___) {
      throw new SyntaxError("keyboard cat!");
    });
    router.get("/unauthorized-err", function (_, __) {
      class UnauthorizedError extends Error {
        constructor(message?: string) {
          super(message);
          this.name = "UnauthorizedError";
        }
      }

      throw new UnauthorizedError("Test unauthorized error");
    });
    router.get("/test-custom-error", (_, __, ___) => {
      class CustomError extends Error {
        constructor(message?: string) {
          super(message);
          this.name = "CustomError";
        }
      }

      throw new CustomError("Test custom error");
    });
  }
  router.post("/register", UserRegisterDto, (req: Request, res: Response) => UserRegisterUserCase(ResponseProvider(res), hashProvider(hash), saveUserImp)(req));
  router.post("/login", UserLoginDto, (req: Request, res: Response) => UserLoginUserCase(ResponseProvider(res), compareProvider(compare), jwtImp, findUserImp)(req));
  router.get("/test", passportUserMiddleware, (req: Request, res: Response) => {
    return res.json(req.user);
  })};
