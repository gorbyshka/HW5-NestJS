import { Injectable } from '@nestjs/common';

import { CustomError } from 'src/error/customError';

import { Readable } from 'stream';

@Injectable()
export class FileService {

  async uploadVideo(video: Express.Multer.File): Promise<Object> {

    if (!video) throw new CustomError('Video file not found', 500);

    const maxFileSize = 500 * 1024 * 1024;
    const allowedMimeTypes = ['video/mp4'];

    return new Promise((resolve, reject) => {

      let fileSize = 0;

      const fileStream = new Readable({ read() { } });

      fileStream.push(video.buffer);
      fileStream.push(null);

      fileStream.on('data', (chunk) => {

        fileSize += chunk.length;

        if (fileSize > maxFileSize) {

          fileStream.destroy();
          reject(new CustomError('File size exceeds the limit (500MB)', 400));

        }

      });

      fileStream.on('end', () => {

        const isMimeTypeAllowed = allowedMimeTypes.some(type => type === video.mimetype);

        if (!isMimeTypeAllowed) reject(new CustomError('Only MP4 video files are allowed', 400));

        else resolve({ message: 'Video successfully uploaded!', statusCode: 200 });

      });

      fileStream.on('error', (error: Error) => { reject(new CustomError('Error processing the file', 500)) });

    });

  }

}
