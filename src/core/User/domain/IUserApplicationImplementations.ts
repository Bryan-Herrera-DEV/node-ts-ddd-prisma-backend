import { IUserBase } from "./IUser";
import { IUserRepository } from "./IUserRepository";

export type SaveUser =(user: IUserBase) => Promise<IUserBase>
export type TSaveUser = (userRepository: IUserRepository) => SaveUser;

export type FindUser = (user: IUserBase) => Promise<IUserBase[]>
export type TFindUser = (userRepository: IUserRepository) => FindUser;
