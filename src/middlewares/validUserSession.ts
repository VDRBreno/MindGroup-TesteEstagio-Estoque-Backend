import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

import RequestDTO from '@/entities/RequestDTO';
import HandleExpressError, { FormattedExpressError } from '@/utils/HandleExpressError';
import PrismaUserRepository from '@/repositories/implements/PrismaUserRepository';
import PrismaUserSessionRepository from '@/repositories/implements/PrismaUserSessionRepository';
import ImageService from '@/services/ImageService';
import ValidUserSessionUseCase from '@/routes/User/ValidSession/ValidUserSessionUseCase';

interface IValidUserSessionRequestDTO {
  user_id: string;
  session_id: string;
}

class ValidUserSessionRequestDTO extends RequestDTO<IValidUserSessionRequestDTO> {

  validate(data: unknown) {
    const schema = Joi.object({
      user_id: Joi.string().required(),
      session_id: Joi.string().required()
    });

    const result = schema.validate(data);

    this.assign(result);

    return !!this.value;
  }

}

export default async function validUserSessionMiddleware(req: Request, res: Response, next: NextFunction) {
  try {

    const data = {
      user_id: req.body.user_id,
      session_id: req.body.session_id
    }
  
    const dto = new ValidUserSessionRequestDTO();
    if(!dto.validate(data) || !dto.value)
      throw new FormattedExpressError({
        error: 'Unable to validUserSession, data is invalid',
        error_code: 'INVALID_DATA',
        description: `${dto.error}`,
        status: 400
      });
  
    const prismaUserRepository = new PrismaUserRepository();
    const prismaUserSessionRepository = new PrismaUserSessionRepository();
    const validUserSessionUseCase = new ValidUserSessionUseCase(prismaUserRepository, prismaUserSessionRepository);
    await validUserSessionUseCase.execute(dto.value);
  
    delete req.body.user_id;
    delete req.body.session_id;
  
    next();

  } catch(error) {

    if(req.file) {
      const imageService = new ImageService();
      imageService.deleteFromUploadsRaw(req.file.filename);
    }

    HandleExpressError({
      error,
      response: res
    });

  }
}