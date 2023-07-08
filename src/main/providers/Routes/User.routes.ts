import { NextFunction, Request, Response, Router } from "express";
import { passportUserMiddleware } from "@/shared/PassportProvider/infraestructure/passportConfig";
import { UserRegisterDto } from "@/core/User/infraestructure/DTOs/UserRegisterDto";
import { UserLoginDto } from "@/core/User/infraestructure/DTOs/UserLoginDto";
import { UserCasesContainer } from "@/core/User/infraestructure/containers/UserCasesContainer";

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
  router.post("/register", UserRegisterDto, (req: Request, res: Response) => UserCasesContainer.userRegisterUserCase(req, res));
  router.post("/login", UserLoginDto, (req: Request, res: Response) => UserCasesContainer.userLoginUserCase(req, res));
  router.get("/get-my-profile", async (req: Request, res: Response, next: NextFunction) => {
    passportUserMiddleware(req, res, next);
    return UserCasesContainer.userGetProfileUserCase(req, res);
  });
};
