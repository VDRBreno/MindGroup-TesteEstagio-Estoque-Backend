import Joi from 'joi';

import RequestDTO from '@/entities/RequestDTO';

export interface ICreateProductRequestDTO {
  name: string;
  description: string;
  value: string;
  file: {
    filename: string;
  };
}

export default class CreateProductRequestDTO extends RequestDTO<ICreateProductRequestDTO> {

  validate(data: unknown) {
    const schema = Joi.object({
      name: Joi.string().required(),
      description: Joi.string().required(),
      value: Joi.number().required(),
      file: Joi.object({
        filename: Joi.string().required()
      }).required()
    });

    const result = schema.validate(data);

    this.assign(result);

    return !!this.value;
  }

}