import { Route } from '@/types/Route';
import HandleExpressError, { FormattedExpressError } from '@/utils/HandleExpressError';
import PrismaProductRepository from '@/repositories/implements/PrismaProductRepository';

import DeleteProductRequestDTO from './DeleteProductDTO';
import DeleteProductUseCase from './DeleteProductUseCase';

const DeleteProductController: Route = {
  handler: async (req, res) => {
    try {

      const dto = new DeleteProductRequestDTO();
      if(!dto.validate(req.params) || !dto.value)
        throw new FormattedExpressError({
          error: 'Unable to DeleteProductController, data is invalid',
          error_code: 'INVALID_DATA',
          description: `${dto.error}`,
          status: 400
        });

      const prismaProductRepository = new PrismaProductRepository();
      const deleteProductUseCase = new DeleteProductUseCase(prismaProductRepository);
      await deleteProductUseCase.execute(dto.value);

      res.status(200).send({ success: true });

    } catch(error) {
      HandleExpressError({
        error,
        response: res
      });
    }
  }
}

export default DeleteProductController;