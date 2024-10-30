import Joi from 'joi';

import RequestDTO from '@/entities/RequestDTO';

export interface IAuthUserRequestDTO {
  email: string;
  password: string;
}

export default class AuthUserRequestDTO extends RequestDTO<IAuthUserRequestDTO> {

  validate(data: unknown) {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required()
    });

    const result = schema.validate(data);

    this.assign(result);

    return !!this.value;
  }

}