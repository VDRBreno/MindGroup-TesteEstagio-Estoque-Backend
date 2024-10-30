// Configure aliases
import moduleAlias from 'module-alias';
moduleAlias.addAlias('@', __dirname);
// Setup ENV vars
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import ConfigureEnvironment from '@/utils/ConfigureEnvironment';
import colorout from '@/utils/colorout';
import { UPLOADS_DIRECTORY } from '@/utils/constants';
import { SERVER_CONFIG, SERVER_URL } from '@/config/server.config';
import routes from '@/routes';

try {

  ConfigureEnvironment();

  const server = express();

  server.use(express.json());
  server.use(cors());
  server.use(morgan('dev'));
  server.use(routes);

  server.use('/images', express.static(UPLOADS_DIRECTORY));

  server.listen(SERVER_CONFIG.port, SERVER_CONFIG.host, () => {
    console.log(colorout('fg.green', `Server Running at ${SERVER_URL}`));
  });

} catch(error) {
  console.log(error);
  process.exit(1);
}