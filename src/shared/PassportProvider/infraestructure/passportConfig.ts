import passport from "passport";
import { FindUser } from "@/core/User/application/repositoryImplementations/FindUser";
import { PrismaUserRepository } from "@/core/User/infraestructure/repositorys/PrismaUserRepository";
import { PrismaProvider } from "@/main/providers/PrismaProvider";
import { UserJwt } from "@/core/User/infraestructure/strategys/UserJwt";
import { UnauthorizedError } from "@/shared/CustomErrors/CustomErrors";

const repository = PrismaUserRepository(PrismaProvider);

const findUserImp = FindUser(repository);

passport.use("jwt-user", UserJwt(findUserImp));

export const passportUserMiddleware = passport.authenticate("jwt-user", { session: false }, (err, user, info) => {
  if (err || !user) {
    throw new UnauthorizedError("UnauthorizedError");
  }
  return user;
});

export default passport;
