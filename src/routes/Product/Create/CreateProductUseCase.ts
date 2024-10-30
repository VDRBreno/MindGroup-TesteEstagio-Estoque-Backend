import Product from '@/entities/Product';
import { IProductRepository } from '@/repositories/ProductRepository';
import ImageService from '@/services/ImageService';
import getFileTypeFromFilename from '@/utils/getFileTypeFromFilename';

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
      value: +data.value,
      quantity: 0
    });
    
    const imageService = new ImageService();

    try {

      const newImageFilename = `${product.id}.${getFileTypeFromFilename(data.file.filename)}`;
      product.image_name = newImageFilename;

      await this.productRepository.create({ product });

      imageService.moveFromRawDirectoryToUploads(data.file.filename, newImageFilename);

    } catch(error) {

      const productExists = await this.productRepository.findById({ id: product.id });
      if(productExists)
        imageService.deleteFromUploads(product.image_name);

      imageService.deleteFromUploadsRaw(data.file.filename);

      throw error;

    }

  }
}