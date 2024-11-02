import bcrypt from 'bcrypt';

import { IUserRepository } from '@/repositories/UserRepository';
import { IUserSessionRepository } from '@/repositories/UserSessionRepository';
import { FormattedExpressError } from '@/utils/HandleExpressError';
import UserSession from '@/entities/UserSession';

import { IAuthUserRequestDTO } from './AuthUserDTO';
import JWT from '@/entities/JWT';

export default class AuthUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private userSessionRepository: IUserSessionRepository
  ) {}

  async execute(data: IAuthUserRequestDTO) {

    const { user } = await this.userRepository.getPasswordByEmail({ email: data.email.trim() });
    if(!user)
      throw new FormattedExpressError({
        error: 'Unable to AuthUserUseCase',
        error_code: 'USER_NOT_FOUND',
        description: 'Usuário não encontrado',
        status: 404
      });

    const isValidPassword = bcrypt.compareSync(data.password, user.password);
    if(!isValidPassword)
      throw new FormattedExpressError({
        error: 'Unable to AuthUserUseCase',
        error_code: 'INVALID_PASSWORD',
        description: 'Senha inválida',
        status: 406
      });

    await this.userSessionRepository.deleteByUserId({ user_id: user.id });

    const userSession = new UserSession({
      user_id: user.id
    });

    await this.userSessionRepository.create({ userSession });

    const token = new JWT().sign({ user_id: user.id, session_id: userSession.id });

    return {
      token
    };

  }
}