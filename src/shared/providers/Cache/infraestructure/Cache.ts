import { TGetCache, TSetCache } from "../domain/ICache";
export const getCache: TGetCache = async (client, key) => {
  const result = await client.get(key);
  if (!result) {
    return null;
  }
  return JSON.parse(result);
};

export const setCache: TSetCache = async (client, key, value, options) => {
  await client.set(key, value, options);
};
