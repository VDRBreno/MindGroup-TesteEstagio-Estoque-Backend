import { IUserRepository } from '@/repositories/UserRepository';
import { IUserSessionRepository } from '@/repositories/UserSessionRepository';
import { FormattedExpressError } from '@/utils/HandleExpressError';
import JWT from '@/entities/JWT';

import { IValidUserSessionRequestDTO } from './ValidUserSessionDTO';

export default class ValidUserSessionUseCase {
  constructor(
    private userRepository: IUserRepository,
    private userSessionRepository: IUserSessionRepository
  ) {}

  async execute(data: IValidUserSessionRequestDTO) {

    const token = data.token.split(' ')[1];
    const payload = new JWT().decode(token);

    if(!payload || !('data' in payload) || !('user_id' in payload.data) || !('session_id' in payload.data))
      throw new FormattedExpressError({
        error: 'Unable to validUserSession, invalid token data',
        error_code: 'INVALID_TOKEN',
        description: 'Token de autenticação inválido',
        status: 401
      });

    const { user } = await this.userRepository.findById({ id: payload.data.user_id });
    if(!user)
      throw new FormattedExpressError({
        error: 'Unable to ValidUserSessionUseCase',
        error_code: 'USER_NOT_FOUND',
        description: 'Usuário não encontrado',
        status: 404
      });

    const { userSession } = await this.userSessionRepository.findById({ id: payload.data.session_id });
    if(!userSession)
      throw new FormattedExpressError({
        error: 'Unable to ValidUserSessionUseCase',
        error_code: 'SESSION_NOT_FOUND',
        description: 'Sessão não encontrada',
        status: 404
      });

    if(new Date() > userSession.expires_at) {
      await this.userSessionRepository.delete({ id: userSession.id });
      throw new FormattedExpressError({
        error: 'Able to ValidUserSessionUseCase, but session is expired',
        error_code: 'SESSION_EXPIRED',
        description: 'Sessão expirada',
        status: 401
      });
    }

  }
}