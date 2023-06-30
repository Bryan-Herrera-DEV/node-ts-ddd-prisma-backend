import { UserRegisterUserCase } from '@/core/User/application/UseCases/UserRegisterUserCase';
import { PrismaUserRepository } from '@/core/User/infraestructure/repositorys/PrismaUserRepository';
import { SaveUser } from '@/core/User/application/repositoryImplementations/SaveUser';

import { Request, Response, Router } from 'express';
import { PrismaProvider } from '../PrismaProvider';
import { ResponseProvider } from '@/shared/providers/Response/infraestructure/Response';

const repository = PrismaUserRepository(PrismaProvider)

const saveUserImp = SaveUser(repository)

export const register = (router: Router) => {
  router.post('/register', (req: Request, res: Response) => UserRegisterUserCase(ResponseProvider(res), saveUserImp)(req));
};
