import { Router } from 'express';

import { multerUpload } from '@/config/multer.config';

const routes = Router();

routes.post('/image', multerUpload.single('image'), (req, res) => {
  console.log(req.file)
  res.send('Hello')
});

export default routes;