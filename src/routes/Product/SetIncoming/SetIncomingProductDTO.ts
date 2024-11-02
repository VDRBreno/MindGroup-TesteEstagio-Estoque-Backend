import Joi from 'joi';

import RequestDTO from '@/entities/RequestDTO';

export interface ISetIncomingProductRequestDTO {
  id: string;
  quantity: number;
}

export default class SetIncomingProductRequestDTO extends RequestDTO<ISetIncomingProductRequestDTO> {

  validate(data: unknown) {
    const schema = Joi.object({
      id: Joi.string().required(),
      quantity: Joi.number().min(0).strict().required()
    });

    const result = schema.validate(data);

    this.assign(result);

    return !!this.value;
  }

}