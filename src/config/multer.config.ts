import multer from 'multer';

import { UPLOADS_RAW_DIRECTORY } from '@/utils/constants';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_RAW_DIRECTORY);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

export const multerUpload = multer({
  storage,
  limits: { fileSize: 5000000 },
  fileFilter: (req, file, cb) => {
    const extAllowed = ['jpg', 'png', 'jpeg', 'webp'];
    const filenameSplitted = file.originalname.split('.');
    const fileType = filenameSplitted[filenameSplitted.length-1];
    const isAllowed = extAllowed.includes(fileType);
    cb(null, isAllowed);
  }
});