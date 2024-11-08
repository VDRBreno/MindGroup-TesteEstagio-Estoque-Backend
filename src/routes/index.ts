import { Router } from 'express';

import validUserSessionMiddleware from '@/middlewares/validUserSession';

import AuthUserController from './User/Auth';
import CreateUserController from './User/Create';
import ValidUserSessionController from './User/ValidSession';

import ListProductController from './Product/List';
import CreateProductController from './Product/Create';
import UpdateProductController from './Product/Update';
import SetIncomingProductController from './Product/SetIncoming';
import DeleteProductController from './Product/Delete';

const routes = Router();

routes.post('/user/create', CreateUserController.handler);
routes.post('/user/auth', AuthUserController.handler);
routes.post('/user/session/valid', ValidUserSessionController.handler);

routes.get('/product/list', validUserSessionMiddleware, ListProductController.handler);
routes.post('/product/create', validUserSessionMiddleware, CreateProductController.handler);
routes.patch('/product/update', validUserSessionMiddleware, UpdateProductController.handler);
routes.patch('/product/update/setIncoming', validUserSessionMiddleware, SetIncomingProductController.handler);
routes.delete('/product/delete/:product_id', validUserSessionMiddleware, DeleteProductController.handler);

export default routes;