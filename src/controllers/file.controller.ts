import { UploadFolder } from '@common';
import {
  BadRequestException,
  Controller,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { S3Service } from '@services';
import { isEnum } from 'class-validator';

@Controller()
export class FileController {
  constructor(private readonly s3Service: S3Service) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('image'))
  uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Query('folder') folder?: string,
  ) {
    if (folder && !isEnum(folder, UploadFolder)) {
      throw new BadRequestException('Please enter correct folder');
    }

    return this.s3Service.uploadFile(file, folder);
  }
}
