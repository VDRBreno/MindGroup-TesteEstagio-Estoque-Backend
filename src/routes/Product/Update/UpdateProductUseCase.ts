import Product from '@/entities/Product';
import { IProductRepository } from '@/repositories/ProductRepository';

import { IUpdateProductRequestDTO } from './UpdateProductDTO';
import { FormattedExpressError } from '@/utils/HandleExpressError';
import ImageService from '@/services/ImageService';
import getFileTypeFromFilename from '@/utils/getFileTypeFromFilename';

export default class UpdateProductUseCase {
  constructor(
    private productRepository: IProductRepository
  ) {}

  async execute(data: IUpdateProductRequestDTO) {

    const { product } = await this.productRepository.findById({ id: data.id });
    if(!product)
      throw new FormattedExpressError({
        error: 'Unable to UpdateProductUseCase',
        error_code: 'PRODUCT_NOT_FOUND',
        description: 'Produto não encontrado',
        status: 404
      });

    const productUpdated = new Product({
      name: data.name,
      description: data.description,
      image_name: '',
      value: +data.value,
      quantity: 0
    }, {
      id: product.id,
      created_at: product.created_at
    });

    const imageService = new ImageService();

    try {

      const newImageFilename = `${product.id}.${getFileTypeFromFilename(data.file.filename)}`;
      productUpdated.image_name = newImageFilename;

      await this.productRepository.update({ product: productUpdated });

      imageService.deleteFromUploads(product.image_name);
      imageService.moveFromRawDirectoryToUploads(data.file.filename, newImageFilename);

      return {
        product: productUpdated
      };

    } catch(error) {

      imageService.deleteFromUploadsRaw(data.file.filename);

      throw new FormattedExpressError({
        error,
        error_code: 'FAIL_TO_UPDATE_PRODUCT',
        description: 'Não foi possível atualizar o produto',
        status: 500
      });

    }

  }
}