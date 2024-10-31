import { Route } from '@/types/Route';
import HandleExpressError, { FormattedExpressError } from '@/utils/HandleExpressError';
import PrismaUserRepository from '@/repositories/implements/PrismaUserRepository';
import PrismaUserSessionRepository from '@/repositories/implements/PrismaUserSessionRepository';

import AuthUserRequestDTO from './AuthUserDTO';
import AuthUserUseCase from './AuthUserUseCase';

const AuthUserController: Route = {
  handler: async (req, res) => {
    try {

      const dto = new AuthUserRequestDTO();
      if(!dto.validate(req.body) || !dto.value)
        throw new FormattedExpressError({
          error: 'Unable to AuthUserController, data is invalid',
          description: `${dto.error}`,
          status: 400
        });

      const prismaUseRepository = new PrismaUserRepository();
      const prismaUserSessionRepository = new PrismaUserSessionRepository();
      const authUserUseCase = new AuthUserUseCase(prismaUseRepository, prismaUserSessionRepository);
      const { userId, sessionId } = await authUserUseCase.execute(dto.value);

      res.status(200).send({ userId, sessionId });

    } catch(error) {
      HandleExpressError({
        error,
        response: res
      });
    }
  }
}

export default AuthUserController;