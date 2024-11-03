import Product from '@/entities/Product';
import { IProductRepository } from '@/repositories/ProductRepository';
import { FormattedExpressError } from '@/utils/HandleExpressError';
import ImageService from '@/services/ImageService';

import { IUpdateProductRequestDTO } from './UpdateProductDTO';

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
      image_name: data.image_base64 ?'' :product.image_name,
      value: data.value,
      quantity: product.quantity
    }, {
      id: product.id,
      created_at: product.created_at
    });

    productUpdated.image_name = `${product.id}.png`;
    
    const imageService = new ImageService();

    try {
      
      await this.productRepository.update({ product: productUpdated });
      
      if(data.image_base64)
        imageService.saveImage(data.image_base64, productUpdated.image_name);

      return {
        product: productUpdated
      };

    } catch(error) {

      imageService.deleteImage(productUpdated.image_name);

      throw new FormattedExpressError({
        error,
        error_code: 'FAIL_TO_UPDATE_PRODUCT',
        description: 'Não foi possível atualizar o produto',
        status: 500
      });

    }

  }
}