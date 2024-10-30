import prisma from '@/prisma';

import { ICreateUser, IFindUserByEmail, IFindUserByEmailResponse, IUserRepository } from '../UserRepository';

export default class PrismaUserRepository implements IUserRepository {

  async findByEmail(data: IFindUserByEmail): Promise<IFindUserByEmailResponse> {

    const user = await prisma.user.findFirst({
      where: {
        email: data.email
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