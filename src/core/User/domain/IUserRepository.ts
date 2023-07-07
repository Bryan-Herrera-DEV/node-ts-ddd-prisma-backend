import { GetResult } from "@prisma/client/runtime";
import { IUserBase } from "./IUser";
import { Filter } from "@/shared/Types/IFilter";
import { Nullable } from "@/shared/Types/TNullable";

export interface IUserRepository {
    save(user: IUserBase): Promise<GetResult<IUserBase, { [x: string]: () => unknown; }>>;
    find(criteria: Filter<IUserBase>[]): Promise<Nullable<IUserBase>>
}
