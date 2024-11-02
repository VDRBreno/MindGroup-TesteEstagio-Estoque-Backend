import Product from '@/entities/Product';
import { IProductRepository } from '@/repositories/ProductRepository';
import ImageService from '@/services/ImageService';
import { FormattedExpressError } from '@/utils/HandleExpressError';

import { ICreateProductRequestDTO } from './CreateProductDTO';

export default class CreateProductUseCase {
  constructor(
    private productRepository: IProductRepository
  ) {}

  async execute(data: ICreateProductRequestDTO) {

    const product = new Product({
      name: data.name,
      description: data.description,
      image_name: '',
      value: data.value,
      quantity: 0
    });

    product.image_name = `${product.id}.png`;
    
    const imageService = new ImageService();

    try {
  
      await this.productRepository.create({ product });
      
      imageService.saveImage(data.image_base64, product.image_name);

      return {
        product
      };

    } catch(error) {

      imageService.deleteImage(product.image_name);

      throw new FormattedExpressError({
        error,
        error_code: 'FAIL_TO_CREATE_PRODUCT',
        description: 'Não foi possível cadastrar o produto',
        status: 500
      });

    }

  }
}