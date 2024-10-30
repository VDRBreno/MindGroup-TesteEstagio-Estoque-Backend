import User from '@/entities/User';

export interface IFindUserByEmail {
  email: string;
}
export interface IFindUserByEmailResponse {
  user: User | null;
}

export interface ICreateUser {
  user: User;
}

export interface IUserRepository {
  findByEmail: (data: IFindUserByEmail) => Promise<IFindUserByEmailResponse>;
  create: (data: ICreateUser) => Promise<void>;
}