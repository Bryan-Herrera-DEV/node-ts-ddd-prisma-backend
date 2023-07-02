import { TSaveUser } from "../../domain/IUserApplicationImplementations";

export const SaveUser: TSaveUser = (userRepository) => async (user) => {
    return await userRepository.save(user);
};

