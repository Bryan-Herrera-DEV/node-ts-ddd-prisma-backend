import { TResponseLoggerImp } from "@/shared/providers/Response/domain/IResponse";
import { SaveUser, FindUser } from "./IUserApplicationImplementations";
import { Request, Response } from "express";
import { TComapreProviderImp, THashProviderImp } from "@/shared/providers/HashProvider/domain/IHashProvider";
import { DecodeInterface, TCreateJwtProviderImp } from "@/shared/providers/JwtProvider/domain/TJwtProvider";

type EndpointHandler<T extends unknown[]> = (ResponserProvider: TResponseLoggerImp, ...implementations: T) => (req: Request) => Promise<Response<unknown, Record<string, unknown>> | undefined>;

export type TUserRegisterUserCase = EndpointHandler<[THashProviderImp, SaveUser]>;
export type TUserLoginUserCase = EndpointHandler<[TComapreProviderImp, TCreateJwtProviderImp, FindUser]>;
export type TUserGetProfileUserCase = EndpointHandler<[DecodeInterface, FindUser]>;
