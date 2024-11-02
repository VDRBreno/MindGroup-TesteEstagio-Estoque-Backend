import Joi from 'joi';

import RequestDTO from '@/entities/RequestDTO';

export interface ICreateProductRequestDTO {
  image_base64: string;
  name: string;
  description: string;
  value: number;
}

export default class CreateProductRequestDTO extends RequestDTO<ICreateProductRequestDTO> {

  validate(data: unknown) {
    const schema = Joi.object({
      image_base64: Joi.string().base64().required(),
      name: Joi.string().required(),
      description: Joi.string().required(),
      value: Joi.number().strict().required()
    });

    const result = schema.validate(data);

    this.assign(result);

    return !!this.value;
  }

}