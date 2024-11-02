import { NextFunction, Request, Response } from 'express';

import HandleExpressError, { FormattedExpressError } from '@/utils/HandleExpressError';
import PrismaUserRepository from '@/repositories/implements/PrismaUserRepository';
import PrismaUserSessionRepository from '@/repositories/implements/PrismaUserSessionRepository';
import ValidUserSessionUseCase from '@/routes/User/ValidSession/ValidUserSessionUseCase';

export default async function validUserSessionMiddleware(req: Request, res: Response, next: NextFunction) {
  try {

    if(!req.headers.authorization || req.headers.authorization.split(' ').length!==2)
      throw new FormattedExpressError({
        error: 'Unable to validUserSession, token is invalid',
        error_code: 'INVALID_TOKEN',
        description: 'Token de autenticação inválido',
        status: 401
      });
      
    const data = {
      token: req.headers.authorization
    }
  
    const prismaUserRepository = new PrismaUserRepository();
    const prismaUserSessionRepository = new PrismaUserSessionRepository();
    const validUserSessionUseCase = new ValidUserSessionUseCase(prismaUserRepository, prismaUserSessionRepository);
    await validUserSessionUseCase.execute(data);

    next();

  } catch(error) {

    HandleExpressError({
      error,
      response: res
    });

  }
}