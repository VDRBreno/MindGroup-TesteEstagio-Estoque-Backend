import { Router } from 'express';

import { multerUpload } from '@/config/multer.config';
import validUserSessionMiddleware from '@/middlewares/validUserSession';

import CreateProductController from './Product/Create';
import CreateUserController from './User/Create';
import AuthUserController from './User/Auth';

const routes = Router();

routes.post('/user/create', CreateUserController.handler);
routes.post('/user/auth', AuthUserController.handler);

routes.post('/product/create', multerUpload.single('image'), validUserSessionMiddleware, CreateProductController.handler);

export default routes;