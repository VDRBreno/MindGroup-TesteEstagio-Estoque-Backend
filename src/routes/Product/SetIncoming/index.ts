import { Route } from '@/types/Route';
import HandleExpressError, { FormattedExpressError } from '@/utils/HandleExpressError';
import PrismaProductRepository from '@/repositories/implements/PrismaProductRepository';

import SetIncomingProductRequestDTO from './SetIncomingProductDTO'
import SetIncomingProductUseCase from './SetIncomingProductUseCase';

const SetIncomingProductController: Route = {
  handler: async (req, res) => {
    try {

      const dto = new SetIncomingProductRequestDTO();
      if(!dto.validate(req.body) || !dto.value)
        throw new FormattedExpressError({
          error: 'Unable to SetIncomingProductController, data is invalid',
          error_code: 'INVALID_DATA',
          description: `${dto.error}`,
          status: 400
        });

      const prismaProductRepository = new PrismaProductRepository();
      const setIncomingProductUseCase = new SetIncomingProductUseCase(prismaProductRepository);
      const { product } = await setIncomingProductUseCase.execute(dto.value);

      res.status(200).send({ product });

    } catch(error) {

      HandleExpressError({
        error,
        response: res
      });
    }
  }
}

export default SetIncomingProductController;