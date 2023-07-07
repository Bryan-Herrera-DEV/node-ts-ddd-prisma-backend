import { Filter } from "@/shared/Types/IFilter";
import { IUserBase } from "./IUser";
import { IUserRepository } from "./IUserRepository";
import { Nullable } from "@/shared/Types/TNullable";

export type SaveUser =(user: IUserBase) => Promise<IUserBase>
export type TSaveUser = (userRepository: IUserRepository) => SaveUser;

export type FindUser = (criteria: Filter<IUserBase>[]) => Promise<Nullable<IUserBase>>
export type TFindUser = (userRepository: IUserRepository) => FindUser;
