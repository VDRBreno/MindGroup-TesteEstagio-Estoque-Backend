import Product from '@/entities/Product';

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
  list: () => Promise<IListProductResponse>;
  findById: (data: IFindProductById) => Promise<IFindProductByIdResponse>;
  create: (data: ICreateProduct) => Promise<void>;
  update: (data: IUpdateProduct) => Promise<void>;
  delete: (data: IDeleteProduct) => Promise<IDeleteProductResponse>;
}