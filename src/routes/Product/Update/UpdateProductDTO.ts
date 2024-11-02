import Joi from 'joi';

import RequestDTO from '@/entities/RequestDTO';

export interface IUpdateProductRequestDTO {
  image_base64?: string;
  id: string;
  name: string;
  description: string;
  value: number;
}

export default class UpdateProductRequestDTO extends RequestDTO<IUpdateProductRequestDTO> {

  validate(data: unknown) {
    const schema = Joi.object({
      image_base64: Joi.string().base64().optional(),      
      id: Joi.string().required(),
      name: Joi.string().required(),
      description: Joi.string().required(),
      value: Joi.number().strict().required()
    });

    const result = schema.validate(data);

    this.assign(result);

    return !!this.value;
  }

}