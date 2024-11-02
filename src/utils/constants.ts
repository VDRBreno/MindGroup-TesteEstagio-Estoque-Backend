import path from 'node:path';

export const SRC_DIRECTORY = path.join(__dirname, '..');
export const ROOT_DIRECTORY = path.join(SRC_DIRECTORY, '..');
export const UPLOAD_IMAGES_DIRECTORY = path.join(ROOT_DIRECTORY, 'images');
export const KEYS_DIRECTORY = path.join(ROOT_DIRECTORY, 'keys');
export const KEY_JWT_PRIVATE_PATH = path.join(KEYS_DIRECTORY, 'jwt_private.key');
export const KEY_JWT_PUBLIC_PATH = path.join(KEYS_DIRECTORY, 'jwt_public.key');