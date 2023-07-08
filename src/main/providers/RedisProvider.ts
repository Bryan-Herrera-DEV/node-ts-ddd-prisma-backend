import { createClient } from "redis";

const cacheOptions = {
  url: process.env.REDIS_URL
};
const CustomRedisClient = createClient({ url: cacheOptions.url });

export type RedisClientType = typeof CustomRedisClient;

(async () => {
  await CustomRedisClient.connect();
})();

export default CustomRedisClient;
