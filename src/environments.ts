import * as dotenv from 'dotenv';
import * as convict from 'convict';

dotenv.config();

export const env = convict({
  environment: {
    format: String,
    default: 'development',
    env: 'NODE_ENV',
    doc: 'Is Production',
  },
  port: {
    format: Number,
    default: 8000,
    env: 'PORT',
    doc: 'Port of server',
  },
  graphqlEndpoint: {
    format: String,
    default: 'graphql',
    env: 'GRAPHQL_ENDPOINT',
    doc: 'Endpoint of graphql',
  },
  logColor: {
    format: String,
    default: '#6d20ab',
    env: 'LOG_PRIMARY_COLOR',
    doc: 'Color of log request',
  },
  rateLimit: {
    format: Number,
    default: 1000,
    env: 'RATE_LIMIT_MAX',
    doc: 'Rate limit request / IP',
  },
  mongoUrl: {
    format: String,
    default: 'mongodb://localhost:27017/lixibox',
    env: 'MONGODB_URL',
    doc: 'Mongo Database Url',
  },
  mail: {
    author: {
      format: String,
      default: 'Lixi',
      env: 'MAIL_AUTHOR',
      doc: 'Name of sender',
    },
    issuer: {
      format: String,
      default: 'Lixi NFT Team',
      env: 'MAIL_ISSUER',
      doc: '',
    },
    nodemailerUser: {
      format: String,
      default: 'apikey',
      env: 'NODEMAILER_USER',
      doc: 'Type of user mail service',
    },
    nodemailerPass: {
      format: String,
      default: '',
      env: 'NODEMAILER_PASS',
      doc: 'Api key mail',
    },
  },
  aws: {
    accessKey: {
      format: String,
      default: '',
      env: 'AWS_ACCESS_KEY',
      doc: 'Amazon access key',
    },
    keySecret: {
      format: String,
      default: '',
      env: 'AWS_KEY_SECRET',
      doc: 'Amazon key secret',
    },
    region: {
      format: String,
      default: '',
      env: 'AWS_REGION',
      doc: 'Amazon region',
    },
    S3Bucket: {
      format: String,
      default: 'lixinft-image',
      env: 'AWS_S3_BUCKET',
      doc: 'Amazon S3 bucket',
    },
  },
});

export default env;
