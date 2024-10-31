import { Route } from '@/types/Route';
import HandleExpressError, { FormattedExpressError } from '@/utils/HandleExpressError';
import PrismaUserRepository from '@/repositories/implements/PrismaUserRepository';
import PrismaUserSessionRepository from '@/repositories/implements/PrismaUserSessionRepository';

import ValidUserSessionRequestDTO from './ValidUserSessionDTO';
import ValidUserSessionUseCase from './ValidUserSessionUseCase';

const ValidUserSessionController: Route = {
  handler: async (req, res) => {
    try {

      const dto = new ValidUserSessionRequestDTO();
      if(!dto.validate(req.body) || !dto.value)
        throw new FormattedExpressError({
          error: 'Unable to ValidUserSessionController, data is invalid',
          error_code: 'INVALID_DATA',
          description: `${dto.error}`,
          status: 400
        });

      const prismaUseRepository = new PrismaUserRepository();
      const prismaUserSessionRepository = new PrismaUserSessionRepository();
      const validUserSessionUseCase = new ValidUserSessionUseCase(prismaUseRepository, prismaUserSessionRepository);
      await validUserSessionUseCase.execute(dto.value);

      res.status(200).send({ success: true });

    } catch(error) {
      HandleExpressError({
        error,
        response: res
      });
    }
  }
}

export default ValidUserSessionController;