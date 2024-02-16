import {
  Controller,
  HttpCode,
  Post,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.service';
import { CustomError } from 'src/error/customError';

@Controller('upload')
export class FileController {

  constructor(private fileService: FileService) { }

  @Post()
  @UseInterceptors(FileInterceptor('video'))
  @HttpCode(200)
  async uploadVideo(@UploadedFile() video: Express.Multer.File): Promise<Object> {

    try { return await this.fileService.uploadVideo(video) }

    catch (error) { new CustomError('Error processing on Controller', 500) }

  }

}
