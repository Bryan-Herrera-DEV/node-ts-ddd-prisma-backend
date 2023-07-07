import { TSaveUser } from "../../domain/IUserApplicationImplementations";

export const SaveUser: TSaveUser = (repository) => async (user) => {
    return await repository.save(user);
};
