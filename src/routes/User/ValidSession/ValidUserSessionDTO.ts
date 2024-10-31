import Joi from 'joi';

import RequestDTO from '@/entities/RequestDTO';

export interface IValidUserSessionRequestDTO {
  user_id: string;
  session_id: string;
}

export default class ValidUserSessionRequestDTO extends RequestDTO<IValidUserSessionRequestDTO> {

  validate(data: unknown) {
    const schema = Joi.object({
      user_id: Joi.string().email().required(),
      session_id: Joi.string().required()
    });

    const result = schema.validate(data);

    this.assign(result);

    return !!this.value;
  }

}