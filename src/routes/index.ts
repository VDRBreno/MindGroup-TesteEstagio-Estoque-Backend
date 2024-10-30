import { Router } from 'express';

import { multerUpload } from '@/config/multer.config';

import CreateProductController from './Product/Create';

const routes = Router();

routes.post('/product/create', multerUpload.single('image'), CreateProductController.handler);

export default routes;