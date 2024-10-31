import bcrypt from 'bcrypt';

import { IUserRepository } from '@/repositories/UserRepository';
import { IUserSessionRepository } from '@/repositories/UserSessionRepository';
import { FormattedExpressError } from '@/utils/HandleExpressError';
import UserSession from '@/entities/UserSession';

import { IValidUserSessionRequestDTO } from './ValidUserSessionDTO';

export default class ValidUserSessionUseCase {
  constructor(
    private userRepository: IUserRepository,
    private userSessionRepository: IUserSessionRepository
  ) {}

  async execute(data: IValidUserSessionRequestDTO) {

    const { user } = await this.userRepository.findById({ id: data.user_id });
    if(!user)
      throw new FormattedExpressError({
        error: 'Unable to ValidUserSessionUseCase',
        error_code: 'USER_NOT_FOUND',
        description: 'Usuário não encontrado',
        status: 404
      });

    const { userSession } = await this.userSessionRepository.findById({ id: data.session_id });
    if(!userSession)
      throw new FormattedExpressError({
        error: 'Unable to ValidUserSessionUseCase',
        error_code: 'SESSION_NOT_FOUND',
        description: 'Sessão não encontrada',
        status: 404
      });

    if(new Date() > userSession.expires_at)
      throw new FormattedExpressError({
        error: 'Able to ValidUserSessionUseCase, session is expired',
        error_code: 'SESSION_EXPIRED',
        description: 'Sessão expirada',
        status: 401
      });

  }
}