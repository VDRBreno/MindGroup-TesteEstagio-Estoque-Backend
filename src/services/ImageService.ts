import path from 'node:path';
import fs from 'node:fs';

import { UPLOADS_DIRECTORY, UPLOADS_RAW_DIRECTORY } from '@/utils/constants';

export default class ImageService {
  
  constructor() {}

  moveFromRawDirectoryToUploads(currentFilename: string, newFilename: string) {

    const currentFilePath = path.join(UPLOADS_RAW_DIRECTORY, currentFilename);
    const newFilePath = path.join(UPLOADS_DIRECTORY, newFilename);

    fs.renameSync(currentFilePath, newFilePath);

  }

  deleteFromUploads(filename: string) {
    fs.rmSync(path.join(UPLOADS_DIRECTORY, filename));
  }

  deleteFromUploadsRaw(filename: string) {
    fs.rmSync(path.join(UPLOADS_RAW_DIRECTORY, filename));
  }

}