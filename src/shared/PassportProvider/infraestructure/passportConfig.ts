import passport from "passport";
import { UserJwt } from "@/core/User/infraestructure/strategys/UserJwt";
import { UnauthorizedError } from "@/shared/CustomErrors/CustomErrors";
import { UserRespositorysContainer } from "@/core/User/infraestructure/containers/UserRespositorysContainer";

passport.use("jwt-user", UserJwt(UserRespositorysContainer.findUserImp));

export const passportUserMiddleware = passport.authenticate("jwt-user", { session: false }, (err, user) => {
  if (err || !user) {
    throw new UnauthorizedError("UnauthorizedError");
  }
  return user;
});

export default passport;
