import prisma from '@/prisma';

import { ICreateProduct, IDeleteProduct, IDeleteProductResponse, IFindProductById, IFindProductByIdResponse, IListProduct, IListProductResponse, IProductRepository, IUpdateProduct } from '../ProductRepository';

export default class PrismaProductRepository implements IProductRepository {

  async list(data: IListProduct): Promise<IListProductResponse> {
    
    const products = await prisma.product.findMany({
      where: {
        name: {
          contains: data.name
        }
      },
      orderBy: {
        [data.orderBy]: 'desc'
      },
      skip: data.limit * (data.page - 1),
      take: data.limit
    });

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

  async delete(data: IDeleteProduct): Promise<IDeleteProductResponse> {

    const product = await prisma.product.delete({
      where: {
        id: data.id
      }
    });

    return {
      product
    };

  }

}