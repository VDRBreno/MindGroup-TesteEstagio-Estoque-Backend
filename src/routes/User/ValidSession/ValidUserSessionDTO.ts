import Joi from 'joi';

import RequestDTO from '@/entities/RequestDTO';

export interface IValidUserSessionRequestDTO {
  token: string;
}

export default class ValidUserSessionRequestDTO extends RequestDTO<IValidUserSessionRequestDTO> {

  validate(data: unknown) {
    const schema = Joi.object({
      token: Joi.string().required()
    });

    const result = schema.validate(data);

    this.assign(result);

    return !!this.value;
  }

}