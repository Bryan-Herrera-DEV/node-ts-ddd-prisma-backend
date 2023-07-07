import { TFindUser } from "../../domain/IUserApplicationImplementations";

export const FindUser: TFindUser = (repository) => async (request) => {
  return repository.find(request);
};
