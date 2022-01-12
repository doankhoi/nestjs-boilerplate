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
});

export default env;
