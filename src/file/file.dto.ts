import { IsNotEmpty, IsString } from 'class-validator';

export class VideoUploadDto {
  @IsNotEmpty()
  @IsString()
  filename: string;

  @IsNotEmpty()
  mimetype: string;

  @IsNotEmpty()
  size: number;
}
