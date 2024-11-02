import { ICreateUserSession, IDeleteUserSession, IDeleteUserSessionByUserId, IFindUserSessionById, IFindUserSessionByIdResponse, IUserSessionRepository } from '../UserSessionRepository';

import prisma from '@/prisma';

export default class PrismaUserSessionRepository implements IUserSessionRepository {

  async findById(data: IFindUserSessionById): Promise<IFindUserSessionByIdResponse> {

    const userSession = await prisma.userSession.findFirst({
      where: {
        id: data.id
      }
    });

    return {
      userSession
    };

  }

  async create(data: ICreateUserSession): Promise<void> {

    await prisma.userSession.create({
      data: data.userSession
    });

  }

  async deleteByUserId(data: IDeleteUserSessionByUserId): Promise<void> {

    const userSession = await prisma.userSession.findFirst({
      where: {
        user_id: data.user_id
      }
    });

    if(userSession)
      await prisma.userSession.delete({
        where: {
          user_id: data.user_id
        }
      });

  }
  
  async delete(data: IDeleteUserSession): Promise<void> {

    await prisma.userSession.delete({
      where: {
        id: data.id
      }
    });

  }

}