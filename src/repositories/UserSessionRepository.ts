import UserSession from '@/entities/UserSession';

export interface IFindUserSessionById {
  id: string;
}
export interface IFindUserSessionByIdResponse {
  userSession: UserSession | null;
}

export interface ICreateUserSession {
  userSession: UserSession;
}

export interface IDeleteUserSessionByUserId {
  user_id: string;
}

export interface IDeleteUserSession {
  id: string;
}

export interface IUserSessionRepository {
  findById: (data: IFindUserSessionById) => Promise<IFindUserSessionByIdResponse>;
  create: (data: ICreateUserSession) => Promise<void>;
  deleteByUserId: (data: IDeleteUserSessionByUserId) => Promise<void>;
  delete: (data: IDeleteUserSession) => Promise<void>;
}