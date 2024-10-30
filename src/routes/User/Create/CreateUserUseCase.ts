import bcrypt from 'bcrypt';

import { IUserRepository } from '@/repositories/UserRepository';
import User from '@/entities/User';
import { FormattedExpressError } from '@/utils/HandleExpressError';

import { ICreateUserRequestDTO } from './CreateUserDTO';

export default class CreateUserUseCase {
  constructor(
    private userRepository: IUserRepository
  ) {}

  async execute(data: ICreateUserRequestDTO) {

    const { user: emailAlreadyRegistered } = await this.userRepository.findByEmail({ email: data.email.trim() });
    if(emailAlreadyRegistered)
      throw new FormattedExpressError({
        error: 'Unable to CreateUserUseCase',
        description: 'Já existe um usuário registrado com esse e-mail',
        status: 409
      });

    const user = new User({
      name: data.name,
      email: data.email,
      password: bcrypt.hashSync(data.password ,8)
    });

    try {
      await this.userRepository.create({ user });
    } catch(error) {
      throw new FormattedExpressError({
        error,
        description: 'Não foi possível cadastrar o usuário',
        status: 500
      });
    }

  }
}