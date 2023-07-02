import { Response } from "express";
import { StatusCodes } from "http-status-codes";

export type TResponseLoggerImp = <T = null>(statusCode: StatusCodes, message: string, data: T) => Promise<void>;
export type IResponse = (res: Response) => TResponseLoggerImp
