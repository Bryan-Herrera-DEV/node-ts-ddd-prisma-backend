import { Request, Response } from 'express';
import { SaveUser } from './IUserApplicationImplementations';

type EndpointHandler<T extends unknown[]> = (req: Request, res: Response, ...implementations: T) => () => Promise<void>;

export type TUserRegisterUserCase = EndpointHandler<[SaveUser]>;
