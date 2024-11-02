import fs from 'node:fs';
import jwt from 'jsonwebtoken';

import { KEY_JWT_PRIVATE_PATH } from '@/utils/constants';

export default class JWT {
  
  private private_key = fs.readFileSync(KEY_JWT_PRIVATE_PATH, 'utf-8');
  
  sign(data: any) {
    const token = jwt.sign({ data }, this.private_key, { algorithm: 'RS256' });
    return token;
  }

  decode(token: string) {
    const payload = jwt.decode(token, { json: true });
    return payload;
  }
}