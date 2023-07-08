import { createClient } from "redis";

const cacheOptions = {
  url: process.env.REDIS_URL
};
const CustomRedisClient = createClient({ url: cacheOptions.url })

export type RedisClientType = typeof CustomRedisClient;

(async () => {
  await CustomRedisClient.connect();
})();

process.on('exit', CustomRedisClient.quit);
process.on('SIGINT', CustomRedisClient.quit);
process.on('SIGTERM', CustomRedisClient.quit);
process.on('uncaughtException', CustomRedisClient.quit);
process.on('error', CustomRedisClient.quit);

export function disconnect() {
  return CustomRedisClient.quit();
}

export default CustomRedisClient;
