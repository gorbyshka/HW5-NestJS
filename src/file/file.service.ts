import { BadRequestException, Injectable } from '@nestjs/common';
import { VideoUploadDto } from './file.dto';

@Injectable()
export class FileService {
  async uploadVideo(video: VideoUploadDto): Promise<Object> {

    if (!video) return { message: 'Video file not found', statusCode: 500 };

    const maxFileSize = 500 * 1024 * 1024;

    if (video.size > maxFileSize || video.mimetype !== 'video/mp4')
      throw new BadRequestException('File size exceeds the limit (500MB) or Only MP4 video files are allowed');

    return { message: 'Video successfully uploaded!', statusCode: 200 };

  }

}
