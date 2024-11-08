import bcrypt from 'bcrypt';

import { IUserRepository } from '@/repositories/UserRepository';
import { IUserSessionRepository } from '@/repositories/UserSessionRepository';
import User from '@/entities/User';
import UserSession from '@/entities/UserSession';
import JWT from '@/entities/JWT';
import { FormattedExpressError } from '@/utils/HandleExpressError';

import { ICreateUserRequestDTO } from './CreateUserDTO';

export default class CreateUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private userSessionRepository: IUserSessionRepository
  ) {}

  async execute(data: ICreateUserRequestDTO) {

    const { user: emailAlreadyRegistered } = await this.userRepository.findByEmail({ email: data.email.trim() });
    if(emailAlreadyRegistered)
      throw new FormattedExpressError({
        error: 'Unable to CreateUserUseCase',
        error_code: 'EMAIL_ALREADY_REGISTERED',
        description: 'Já existe um usuário registrado com esse e-mail',
        status: 409
      });

    const user = new User({
      name: data.name,
      email: data.email,
      password: bcrypt.hashSync(data.password ,8)
    });

    const userSession = new UserSession({
      user_id: user.id
    });

    try {

      await this.userRepository.create({ user });

      await this.userSessionRepository.create({ userSession});

      const token = new JWT().sign({ user_id: user.id, session_id: userSession.id });

      return {
        token
      };

    } catch(error) {
      throw new FormattedExpressError({
        error,
        error_code: 'FAIL_TO_CREATE_USER',
        description: 'Não foi possível cadastrar o usuário',
        status: 500
      });
    }

  }
}