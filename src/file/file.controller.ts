import {
  BadRequestException,
  Controller,
  HttpCode,
  Post,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.service';
import { VideoUploadDto } from './file.dto';

@Controller('upload')
export class FileController {

  constructor(private fileService: FileService) { }

  @Post()
  @UseInterceptors(FileInterceptor('video'))
  @HttpCode(200)
  async uploadVideo(@UploadedFile() video: VideoUploadDto): Promise<Object> {

    try { return await this.fileService.uploadVideo(video) }

    catch (error) { throw new BadRequestException(error.message) }

  }

}
