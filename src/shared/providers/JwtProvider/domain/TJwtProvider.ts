import { SignOptions } from "jsonwebtoken";

export type TCreateJwtProviderImp = <T = null>(object: Record<keyof T, any>, options?: SignOptions) => string;
export type TCreateJwtProvider = () => TCreateJwtProviderImp;
