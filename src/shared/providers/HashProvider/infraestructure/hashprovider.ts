import { TCompare, THash } from "../domain/IHashProvider";

const saltRounds = 10;

export const hashProvider = (hash: THash) => async (password: string): Promise<string> => {
  return await hash(password, saltRounds);
};

export const compareProvider = (compare: TCompare) => async (password: string, hash: string | undefined): Promise<boolean> => {
  if (!hash) {
    return false;
  }
  return await compare(password, hash);
};

