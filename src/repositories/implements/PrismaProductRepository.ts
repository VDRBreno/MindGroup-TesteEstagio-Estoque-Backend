import prisma from '@/prisma';

import { ICreateProduct, IFindProductById, IFindProductByIdResponse, IListProductResponse, IProductRepository, IUpdateProduct } from '../ProductRepository';

export default class PrismaProductRepository implements IProductRepository {

  async list(): Promise<IListProductResponse> {

    const products = await prisma.product.findMany();

    return {
      products
    };

  }

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

  async update(data: IUpdateProduct): Promise<void> {

    await prisma.product.update({
      where: {
        id: data.product.id
      },
      data: data.product
    });

  }

}