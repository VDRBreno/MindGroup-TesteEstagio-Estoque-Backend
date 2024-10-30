import { Route } from '@/types/Route';
import HandleExpressError, { FormattedExpressError } from '@/utils/HandleExpressError';
import PrismaUserRepository from '@/repositories/implements/PrismaUserRepository';

import CreateUserRequestDTO from './CreateUserDTO';
import CreateUserUseCase from './CreateUserUseCase';

const CreateUserController: Route = {
  handler: async (req, res) => {
    try {

      const dto = new CreateUserRequestDTO();
      if(!dto.validate(req.body) || !dto.value)
        throw new FormattedExpressError({
          error: 'Unable to CreateUserController, data is invalid',
          description: `${dto.error}`,
          status: 400
        });

      const prismaUseRepository = new PrismaUserRepository();
      const createUserUseCase = new CreateUserUseCase(prismaUseRepository);
      await createUserUseCase.execute(req.body);

      res.status(201).send();

    } catch(error) {
      HandleExpressError({
        error,
        response: res
      });
    }
  }
}

export default CreateUserController;