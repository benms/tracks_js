import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import * as uuid from 'uuid';

export enum FileType {
  AUDIO = 'audio',
  IMAGE = 'image',
}

@Injectable()
export class FileService {
  createFile(type: string, file): string {
    try {
      file = file[0];
      //console.log({ file });
      const fExt = file.originalname.split('.').pop();
      const fileName = uuid.v4() + '.' + fExt;
      const fPath = path.resolve(__dirname, '..', 'static', type);
      if (!fs.existsSync(fPath)) {
        fs.mkdirSync(fPath, { recursive: true });
      }
      fs.writeFileSync(path.resolve(fPath, fileName), file.buffer);

      return `${type}/${fileName}`;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  removeFile(fileName: string): string {
    return fileName;
  }
}
