import prisma from '@/prisma';

import { ICreateProduct, IFindProductById, IFindProductByIdResponse, IProductRepository } from '../ProductRepository';

export default class PrismaProductRepository implements IProductRepository {

  async findById(data: IFindProductById): Promise<IFindProductByIdResponse> {

    const product = await prisma.product.findFirst({
      where: {
        id: data.id
      }
    });

    return {
      product
    };

  }

  async create(data: ICreateProduct): Promise<void> {

    await prisma.product.create({
      data: data.product
    });

  }

}