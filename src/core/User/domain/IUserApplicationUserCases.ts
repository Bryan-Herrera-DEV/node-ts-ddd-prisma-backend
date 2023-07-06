import { TResponseLoggerImp } from "@/shared/providers/Response/domain/IResponse";
import { SaveUser } from "./IUserApplicationImplementations";
import { Request } from "express";
import { THashProviderImp } from "@/shared/providers/HashProvider/domain/IHashProvider";

type EndpointHandler<T extends unknown[]> = (ResponserProvider: TResponseLoggerImp, hash: THashProviderImp, ...implementations: T) => (req: Request) => Promise<void>;

export type TUserRegisterUserCase = EndpointHandler<[SaveUser]>;
