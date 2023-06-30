import { IUserBase } from "./IUser";
import { IUserRepository } from "./IUserRepository";

export type SaveUser =(user: IUserBase) => Promise<IUserBase>
export type TSaveUser = (userRepository: IUserRepository) => SaveUser;
