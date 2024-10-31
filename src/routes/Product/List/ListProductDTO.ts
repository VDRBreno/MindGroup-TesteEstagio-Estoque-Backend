import Joi from 'joi';

import RequestDTO from '@/entities/RequestDTO';

export interface IListProductRequestDTO {
}

export default class ListProductRequestDTO extends RequestDTO<IListProductRequestDTO> {

  validate(data: unknown) {
    const schema = Joi.object({
    });

    const result = schema.validate(data);

    this.assign(result);

    return !!this.value;
  }

}