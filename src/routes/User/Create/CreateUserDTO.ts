import Joi from 'joi';

import RequestDTO from '@/entities/RequestDTO';

export interface ICreateUserRequestDTO {
  name: string;
  email: string;
  password: string;
}

export default class CreateUserRequestDTO extends RequestDTO<ICreateUserRequestDTO> {

  validate(data: unknown) {
    const schema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required()
    });

    const result = schema.validate(data);

    this.assign(result);

    return !!this.value;
  }

}