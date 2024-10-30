import bcrypt from 'bcrypt';

import { IUserRepository } from '@/repositories/UserRepository';
import { FormattedExpressError } from '@/utils/HandleExpressError';

import { IAuthUserRequestDTO } from './AuthUserDTO';

export default class AuthUserUseCase {
  constructor(
    private userRepository: IUserRepository
  ) {}

  async execute(data: IAuthUserRequestDTO) {

    const { user } = await this.userRepository.findByEmail({ email: data.email.trim() });
    if(!user)
      throw new FormattedExpressError({
        error: 'Unable to AuthUserUseCase',
        description: 'Usuário não encontrado',
        status: 404
      });

    const isValidPassword = bcrypt.compareSync(data.password, user.password);
    if(!isValidPassword)
      throw new FormattedExpressError({
        error: 'Unable to AuthUserUseCase',
        description: 'Senha inválida',
        status: 406
      });

  }
}