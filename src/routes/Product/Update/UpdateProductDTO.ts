import Joi from 'joi';

import RequestDTO from '@/entities/RequestDTO';

export interface IUpdateProductRequestDTO {
  file: {
    filename: string;
  };

  id: string;
  name: string;
  description: string;
  value: string;
}

export default class UpdateProductRequestDTO extends RequestDTO<IUpdateProductRequestDTO> {

  validate(data: unknown) {
    const schema = Joi.object({
      file: Joi.object({
        filename: Joi.string().required()
      }).required(),
      
      id: Joi.string().required(),
      name: Joi.string().required(),
      description: Joi.string().required(),
      value: Joi.number().required()
    });

    const result = schema.validate(data);

    this.assign(result);

    return !!this.value;
  }

}