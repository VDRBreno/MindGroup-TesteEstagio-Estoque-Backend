import Joi from 'joi';

import RequestDTO from '@/entities/RequestDTO';
import { IProductOrderBy, ProductOrderBy } from '@/types/Product';
import { OrderByType } from '@/types/OrderBy';

export interface IListProductRequestDTO {
  name: string;
  orderBy: IProductOrderBy;
  orderByType: 'desc' | 'asc';
  page: number;
  limit: number;
}

export default class ListProductRequestDTO extends RequestDTO<IListProductRequestDTO> {

  validate(data: unknown) {
    const schema = Joi.object({
      name: Joi.string().allow('').required(),
      orderBy: Joi.string().valid(...ProductOrderBy).required(),
      orderByType: Joi.string().valid(...OrderByType).required(),
      page: Joi.number().required(),
      limit: Joi.number().required()
    });

    const result = schema.validate(data);

    this.assign(result);

    return !!this.value;
  }

}