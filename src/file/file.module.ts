import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { FileController } from './file.controller';
import { FileService } from './file.service';

@Module({

  imports: [

    MulterModule.register({

      dest: './uploads',

      fileFilter: (req, file, cb) => {

        if (file.mimetype === 'video/mp4') cb(null, true);

        else cb(new Error('Invalid file type'), false);

      },

    }),

  ],

  controllers: [FileController],

  providers: [FileService],

})

export class FileModule { }
