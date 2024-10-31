import prisma from '@/prisma';
import { UserSecureSelect } from '@/entities/User';

import { ICreateUser, IGetUserPasswordByEmail, IGetUserPasswordByEmailResponse, IFindUserById, IFindUserByIdResponse, IUserRepository, IFindUserByEmail, IFindUserByEmailResponse } from '../UserRepository';

export default class PrismaUserRepository implements IUserRepository {

  async findById(data: IFindUserById): Promise<IFindUserByIdResponse> {

    const user = await prisma.user.findFirst({
      where: {
        id: data.id
      },
      select: UserSecureSelect
    });

    return {
      user
    };

  }

  async findByEmail(data: IFindUserByEmail): Promise<IFindUserByEmailResponse> {

    const user = await prisma.user.findFirst({
      where: {
        email: data.email
      },
      select: UserSecureSelect
    });

    return {
      user
    };

  }

  async getPasswordByEmail(data: IGetUserPasswordByEmail): Promise<IGetUserPasswordByEmailResponse> {

    const user = await prisma.user.findFirst({
      where: {
        email: data.email
      },
      select: {
        id: true,
        password: true
      }
    });

    return {
      user
    };

  }

  async create(data: ICreateUser): Promise<void> {

    await prisma.user.create({
      data: data.user
    });

  }

}