import Product from '@/entities/Product';

export interface IFindProductById {
  id: string;
}
export interface IFindProductByIdResponse {
  product: Product | null;
}

export interface ICreateProduct {
  product: Product;
}

export interface IProductRepository {
  findById: (data: IFindProductById) => Promise<IFindProductByIdResponse>;
  create: (data: ICreateProduct) => Promise<void>;
}