import { Router } from 'express';

import { multerUpload } from '@/config/multer.config';
import validUserSessionMiddleware from '@/middlewares/validUserSession';

import AuthUserController from './User/Auth';
import CreateUserController from './User/Create';
import ValidUserSessionController from './User/ValidSession';

import ListProductController from './Product/List';
import CreateProductController from './Product/Create';
import UpdateProductController from './Product/Update';

const routes = Router();

routes.post('/user/create', CreateUserController.handler);
routes.post('/user/auth', AuthUserController.handler);
routes.post('/user/session/valid', ValidUserSessionController.handler);

routes.get('/product/list', validUserSessionMiddleware, ListProductController.handler);
routes.post('/product/create', multerUpload.single('image'), validUserSessionMiddleware, CreateProductController.handler);
routes.patch('/product/update', multerUpload.single('image'), validUserSessionMiddleware, UpdateProductController.handler);

export default routes;