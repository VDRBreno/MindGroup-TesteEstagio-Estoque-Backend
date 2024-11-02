import { Route } from '@/types/Route';
import HandleExpressError, { FormattedExpressError } from '@/utils/HandleExpressError';
import PrismaUserRepository from '@/repositories/implements/PrismaUserRepository';
import PrismaUserSessionRepository from '@/repositories/implements/PrismaUserSessionRepository';

import CreateUserRequestDTO from './CreateUserDTO';
import CreateUserUseCase from './CreateUserUseCase';

const CreateUserController: Route = {
  handler: async (req, res) => {
    try {

      const dto = new CreateUserRequestDTO();
      if(!dto.validate(req.body) || !dto.value)
        throw new FormattedExpressError({
          error: 'Unable to CreateUserController, data is invalid',
          error_code: 'INVALID_DATA',
          description: `${dto.error}`,
          status: 400
        });

      const prismaUserRepository = new PrismaUserRepository();
      const prismaUserSessionRepository = new PrismaUserSessionRepository();
      const createUserUseCase = new CreateUserUseCase(prismaUserRepository, prismaUserSessionRepository);
      const { token } = await createUserUseCase.execute(dto.value);

      res.status(201).send({ token });

    } catch(error) {
      HandleExpressError({
        error,
        response: res
      });
    }
  }
}

export default CreateUserController;