import { Route } from '@/types/Route';
import HandleExpressError, { FormattedExpressError } from '@/utils/HandleExpressError';
import PrismaProductRepository from '@/repositories/implements/PrismaProductRepository';
import ImageService from '@/services/ImageService';

import CreateProductRequestDTO from './CreateProductDTO';
import CreateProductUseCase from './CreateProductUseCase';

const CreateProductController: Route = {
  handler: async (req, res) => {
    try {

      const data = {
        ...req.body,
        file: {
          filename: req.file?.filename
        }
      }

      const dto = new CreateProductRequestDTO();
      if(!dto.validate(data) || !dto.value)
        throw new FormattedExpressError({
          error: 'Unable to CreateProductController, data is invalid',
          error_code: 'INVALID_DATA',
          description: `${dto.error}`,
          status: 400
        });

      const prismaProductRepository = new PrismaProductRepository();
      const createProductUseCase = new CreateProductUseCase(prismaProductRepository);
      const { product } = await createProductUseCase.execute(dto.value);

      res.status(201).send({ product });

    } catch(error) {

      if(req.file) {
        const imageService = new ImageService();
        imageService.deleteFromUploadsRaw(req.file.filename);
      }

      HandleExpressError({
        error,
        response: res
      });
    }
  }
}

export default CreateProductController;