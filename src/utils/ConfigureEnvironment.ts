import fs from 'node:fs';

import { UPLOADS_DIRECTORY, UPLOADS_RAW_DIRECTORY } from './constants';

export default function ConfigureEnvironment() {

  // CreateUploadsDirectory
  if(!fs.existsSync(UPLOADS_DIRECTORY))
    fs.mkdirSync(UPLOADS_DIRECTORY);

  // CreateUploadsRawDirectory
  if(!fs.existsSync(UPLOADS_RAW_DIRECTORY))
    fs.mkdirSync(UPLOADS_RAW_DIRECTORY);

}