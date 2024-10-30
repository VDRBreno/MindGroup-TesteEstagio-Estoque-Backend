import { Router } from 'express';

import { multerUpload } from '@/config/multer.config';

import CreateProductController from './Product/Create';
import CreateUserController from './User/Create';
import AuthUserController from './User/Auth';

const routes = Router();

routes.post('/user/create', CreateUserController.handler);
routes.post('/user/auth', AuthUserController.handler);

routes.post('/product/create', multerUpload.single('image'), CreateProductController.handler);

export default routes;