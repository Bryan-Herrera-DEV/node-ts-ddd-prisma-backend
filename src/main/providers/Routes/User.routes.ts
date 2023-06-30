import { UserRegisterUserCase } from '@/core/User/application/UseCases/UserRegisterUserCase';
import { PrismaUserRepository } from '@/core/User/infraestructure/repositorys/PrismaUserRepository';
import { SaveUser } from '@/core/User/application/repositoryImplementations/SaveUser';

import { Request, Response, Router } from 'express';
import { PrismaProvider } from '../PrismaProvider';
import { ResponseProvider } from '@/shared/providers/Response/infraestructure/Response';
import { UserRegisterDto } from '@/core/User/infraestructure/DTOs/UserRegisterDto';

const repository = PrismaUserRepository(PrismaProvider)

const saveUserImp = SaveUser(repository)

export const register = (router: Router) => {
  router.post('/register', UserRegisterDto, (req: Request, res: Response) => UserRegisterUserCase(ResponseProvider(res), saveUserImp)(req));
};
