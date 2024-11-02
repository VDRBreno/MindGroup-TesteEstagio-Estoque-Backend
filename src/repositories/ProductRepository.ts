import Product from '@/entities/Product';
import { IOrderByType } from '@/types/OrderBy';
import { IProductOrderBy } from '@/types/Product';

export interface IListProduct {
  name: string;
  orderBy: IProductOrderBy;
  orderByType: IOrderByType;
  page: number;
  limit: number;
}
export interface IListProductResponse {
  products: Product[];
}

export interface IFindProductById {
  id: string;
}
export interface IFindProductByIdResponse {
  product: Product | null;
}

export interface ICreateProduct {
  product: Product;
}

export interface IUpdateProduct {
  product: Product;
}

export interface IDeleteProduct {
  id: string;
}
export interface IDeleteProductResponse {
  product: Product;
}

export interface IProductRepository {
  list: (data: IListProduct) => Promise<IListProductResponse>;
  findById: (data: IFindProductById) => Promise<IFindProductByIdResponse>;
  create: (data: ICreateProduct) => Promise<void>;
  update: (data: IUpdateProduct) => Promise<void>;
  delete: (data: IDeleteProduct) => Promise<IDeleteProductResponse>;
}