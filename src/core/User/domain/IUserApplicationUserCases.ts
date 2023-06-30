import { TResponseLoggerImp } from '@/shared/providers/Response/domain/IResponse';
import { SaveUser } from './IUserApplicationImplementations';
import { Request } from 'express';

type EndpointHandler<T extends unknown[]> = (ResponserProvider: TResponseLoggerImp, ...implementations: T) => (req: Request) => Promise<void>;

export type TUserRegisterUserCase = EndpointHandler<[SaveUser]>;
