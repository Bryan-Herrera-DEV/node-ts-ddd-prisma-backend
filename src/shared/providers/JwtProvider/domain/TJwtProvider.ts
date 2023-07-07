import { SignOptions } from "jsonwebtoken";

export type TCreateJwtProviderImp = <T = null>(object: Record<keyof T, unknown>, options?: SignOptions) => string;
export type TCreateJwtProvider = () => TCreateJwtProviderImp;
