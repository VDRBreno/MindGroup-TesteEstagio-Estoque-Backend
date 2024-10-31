import Joi from 'joi';

import RequestDTO from '@/entities/RequestDTO';

export interface IDeleteProductRequestDTO {
  product_id: string;
}

export default class DeleteProductRequestDTO extends RequestDTO<IDeleteProductRequestDTO> {

  validate(data: unknown) {
    const schema = Joi.object({
      product_id: Joi.string().required()
    });

    const result = schema.validate(data);

    this.assign(result);

    return !!this.value;
  }

}