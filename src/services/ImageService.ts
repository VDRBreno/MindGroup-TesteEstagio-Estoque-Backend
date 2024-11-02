import path from 'node:path';
import fs from 'node:fs';

import { UPLOAD_IMAGES_DIRECTORY } from '@/utils/constants';

export default class ImageService {

  constructor() {}

  async saveImage(data: string, filename: string) {
    try {
    
      const buffer = Buffer.from(data, 'base64');
      
      const imageFilePath = path.join(UPLOAD_IMAGES_DIRECTORY, filename);
      fs.writeFileSync(imageFilePath, buffer);

    } catch(error) {
      throw {
        error,
        message: 'Unable to ImageService.saveImage'
      };
    }
  }

  async deleteImage(filename: string) {
    try {
  
      const imageFilePath = path.join(UPLOAD_IMAGES_DIRECTORY, filename);
      if(fs.existsSync(imageFilePath))
        fs.unlinkSync(imageFilePath);
  
    } catch(error) {
      throw {
        error,
        message: 'Unable to ImageService.deleteImage'
      };
    }
  }

}