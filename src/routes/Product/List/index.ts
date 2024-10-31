import { Route } from '@/types/Route';
import HandleExpressError, { FormattedExpressError } from '@/utils/HandleExpressError';
import PrismaProductRepository from '@/repositories/implements/PrismaProductRepository';

import ListProductRequestDTO from './ListProductDTO';
import ListProductUseCase from './ListProductUseCase';

const ListProductController: Route = {
  handler: async (req, res) => {
    try {

      const dto = new ListProductRequestDTO();
      if(!dto.validate(req.body) || !dto.value)
        throw new FormattedExpressError({
          error: 'Unable to ListProductController, data is invalid',
          error_code: 'INVALID_DATA',
          description: `${dto.error}`,
          status: 400
        });

      const prismaProductRepository = new PrismaProductRepository();
      const listProductUseCase = new ListProductUseCase(prismaProductRepository);
      const { products } = await listProductUseCase.execute(dto.value);

      res.status(200).send({ products });

    } catch(error) {
      HandleExpressError({
        error,
        response: res
      });
    }
  }
}

export default ListProductController;