import { IProductRepository } from '@/repositories/ProductRepository';
import ImageService from '@/services/ImageService';
import { FormattedExpressError } from '@/utils/HandleExpressError';

import { IDeleteProductRequestDTO } from './DeleteProductDTO';

export default class DeleteProductUseCase {
  constructor(
    private productRepository: IProductRepository
  ) {}

  async execute(data: IDeleteProductRequestDTO) {

    const { product: productExists } = await this.productRepository.findById({ id: data.product_id });
    if(!productExists)
      throw new FormattedExpressError({
        error: 'Unable to DeleteProductUseCase',
        error_code: 'PRODUCT_NOT_FOUND',
        description: 'Produto não existe',
        status: 404
      });

    const { product } = await this.productRepository.delete({ id: data.product_id });

    const imageService = new ImageService();
    imageService.deleteImage(product.image_name);

  }
}