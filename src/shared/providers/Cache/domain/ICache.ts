import { RedisClientType } from "@/main/providers/RedisProvider";
import { RedisCommandArgument } from "@node-redis/client/dist/lib/commands";

declare type MaximumOneOf<T, K extends keyof T = keyof T> = K extends keyof T
  ? {
      [P in K]?: T[K];
    } & Partial<Record<Exclude<keyof T, K>, never>>
  : never;

declare type SetTTL = MaximumOneOf<{
  EX: number;
  PX: number;
  EXAT: number;
  PXAT: number;
  KEEPTTL: true;
}>;
declare type SetGuards = MaximumOneOf<{
  NX: true;
  XX: true;
}>;
interface SetCommonOptions {
  GET?: true;
}
declare type SetOptions = SetTTL & SetGuards & SetCommonOptions;

export type TSetCache = (
  client: RedisClientType,
  key: RedisCommandArgument,
  value: RedisCommandArgument | number,
  options?: SetOptions
) => Promise<void>;
export type TGetCache = <T>(
  client: RedisClientType,
  key: string
) => Promise<T | null>;
