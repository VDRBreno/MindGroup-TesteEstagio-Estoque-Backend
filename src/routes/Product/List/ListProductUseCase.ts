import { IProductRepository } from '@/repositories/ProductRepository';

import { IListProductRequestDTO } from './ListProductDTO';

export default class ListProductUseCase {
  constructor(
    private productRepository: IProductRepository
  ) {}

  async execute(data: IListProductRequestDTO) {

    const { products } = await this.productRepository.list();

    return {
      products
    };

  }
}