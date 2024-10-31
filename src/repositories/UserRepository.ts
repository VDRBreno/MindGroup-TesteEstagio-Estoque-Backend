import User, { UserSecure } from '@/entities/User';

export interface IFindUserById {
  id: string;
}
export interface IFindUserByIdResponse {
  user: UserSecure | null;
}

export interface IFindUserByEmail {
  email: string;
}
export interface IFindUserByEmailResponse {
  user: UserSecure | null;
}

export interface IGetUserPasswordByEmail {
  email: string;
}
export interface IGetUserPasswordByEmailResponse {
  user: Pick<User, 'id' | 'password'> | null;
}

export interface ICreateUser {
  user: User;
}

export interface IUserRepository {
  findById: (data: IFindUserById) => Promise<IFindUserByIdResponse>;
  findByEmail: (data: IFindUserByEmail) => Promise<IFindUserByEmailResponse>;
  getPasswordByEmail: (data: IGetUserPasswordByEmail) => Promise<IGetUserPasswordByEmailResponse>;
  create: (data: ICreateUser) => Promise<void>;
}