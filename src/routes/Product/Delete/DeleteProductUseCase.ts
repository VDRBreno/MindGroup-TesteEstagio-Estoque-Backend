import { IProductRepository } from '@/repositories/ProductRepository';
import ImageService from '@/services/ImageService';

import { IDeleteProductRequestDTO } from './DeleteProductDTO';

export default class DeleteProductUseCase {
  constructor(
    private productRepository: IProductRepository
  ) {}

  async execute(data: IDeleteProductRequestDTO) {

    const { product } = await this.productRepository.delete({ id: data.product_id });

    const imageService = new ImageService();
    imageService.deleteFromUploads(product.image_name);

  }
}