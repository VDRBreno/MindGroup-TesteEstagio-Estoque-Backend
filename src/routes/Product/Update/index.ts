import { Route } from '@/types/Route';
import HandleExpressError, { FormattedExpressError } from '@/utils/HandleExpressError';
import PrismaProductRepository from '@/repositories/implements/PrismaProductRepository';
import ImageService from '@/services/ImageService';

import UpdateProductRequestDTO from './UpdateProductDTO'
import UpdateProductUseCase from './UpdateProductUseCase';

const UpdateProductController: Route = {
  handler: async (req, res) => {
    try {

      const dto = new UpdateProductRequestDTO();
      if(!dto.validate(req.body) || !dto.value)
        throw new FormattedExpressError({
          error: 'Unable to UpdateProductController, data is invalid',
          error_code: 'INVALID_DATA',
          description: `${dto.error}`,
          status: 400
        });

      const prismaProductRepository = new PrismaProductRepository();
      const updateProductUseCase = new UpdateProductUseCase(prismaProductRepository);
      const { product } = await updateProductUseCase.execute(dto.value);

      res.status(200).send({ product });

    } catch(error) {

      HandleExpressError({
        error,
        response: res
      });
    }
  }
}

export default UpdateProductController;