import { GetResult } from "@prisma/client/runtime";
import { IUserBase } from "./IUser";

export interface IUserRepository {
    save(user: IUserBase): Promise<GetResult<IUserBase, any>>;
}
