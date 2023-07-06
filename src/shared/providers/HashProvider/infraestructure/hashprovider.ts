import { TCompareProvider, THashProvider } from "../domain/IHashProvider";

const saltRounds = 10;

export const hashProvider: THashProvider = (hash) => async (password) => {
  return await hash(password, saltRounds);
};

export const compareProvider: TCompareProvider = (compare) => async (toComparePassword, encryptedPassword) => {
  if (!toComparePassword || !encryptedPassword) {
    return false;
  }
  return await compare(toComparePassword, encryptedPassword);
};

