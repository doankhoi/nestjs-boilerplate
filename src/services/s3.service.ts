import env from '@environments';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { uuidv4 as uuid } from '@utils';
import { S3 } from 'aws-sdk';

@Injectable()
export class S3Service {
  bucket = env.get('aws.S3Bucket');
  region = env.get('aws.region');
  s3 = new S3({
    credentials: {
      accessKeyId: env.get('aws.accessKey'),
      secretAccessKey: env.get('aws.keySecret'),
    },
  });

  async uploadFile(
    file: Express.Multer.File,
    folder?: string,
  ): Promise<S3.ManagedUpload.SendData> {
    const { originalname, mimetype } = file;
    const bucket = folder ? `${this.bucket}/${folder}` : this.bucket;
    const params = {
      Bucket: bucket,
      Key: `${uuid()}-${originalname}`,
      Body: file.buffer,
      ContentType: mimetype,
      ContentDisposition: 'inline',
      CreateBucketConfiguration: {
        LocationConstraint: this.region,
      },
    };

    try {
      return this.s3.upload(params).promise();
    } catch (error) {
      throw new InternalServerErrorException(
        error,
        'Error occur when upload file to S3',
      );
    }
  }
}
