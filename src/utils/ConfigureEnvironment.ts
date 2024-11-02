import fs from 'node:fs';

import { KEYS_DIRECTORY, UPLOAD_IMAGES_DIRECTORY } from './constants';

export default function ConfigureEnvironment() {

  // CreateUploadImagesDirectory
  if(!fs.existsSync(UPLOAD_IMAGES_DIRECTORY))
    fs.mkdirSync(UPLOAD_IMAGES_DIRECTORY);

  if(!fs.existsSync(KEYS_DIRECTORY))
    throw new Error('Missing RSA keys');

}