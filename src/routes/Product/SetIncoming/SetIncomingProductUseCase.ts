import Product from '@/entities/Product';
import { IProductRepository } from '@/repositories/ProductRepository';
import { FormattedExpressError } from '@/utils/HandleExpressError';

import { ISetIncomingProductRequestDTO } from './SetIncomingProductDTO';

export default class SetIncomingProductUseCase {
  constructor(
    private productRepository: IProductRepository
  ) {}

  async execute(data: ISetIncomingProductRequestDTO) {

    const { product } = await this.productRepository.findById({ id: data.id });
    if(!product)
      throw new FormattedExpressError({
        error: 'Unable to SetIncomingProductUseCase',
        error_code: 'PRODUCT_NOT_FOUND',
        description: 'Produto não encontrado',
        status: 404
      });

    const productUpdated = new Product({
      name: product.name,
      description: product.description,
      image_name: product.image_name,
      value: product.value,
      quantity: data.quantity
    }, {
      id: product.id,
      created_at: product.created_at
    });

    try {
      
      await this.productRepository.update({ product: productUpdated });

      return {
        product: productUpdated
      };

    } catch(error) {

      throw new FormattedExpressError({
        error,
        error_code: 'FAIL_TO_SET_INCOMING_PRODUCT',
        description: 'Não foi possível atualizar o produto',
        status: 500
      });

    }

  }
}