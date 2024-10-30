import path from 'node:path';

export const SRC_DIRECTORY = path.join(__dirname, '..');
export const ROOT_DIRECTORY = path.join(SRC_DIRECTORY, '..');
export const UPLOADS_DIRECTORY = path.join(ROOT_DIRECTORY, 'uploads');
export const UPLOADS_RAW_DIRECTORY = path.join(ROOT_DIRECTORY, 'uploads-raw');