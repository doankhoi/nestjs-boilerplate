import { Injectable } from '@nestjs/common';
import { GqlModuleOptions, GqlOptionsFactory } from '@nestjs/graphql';
import { env } from '../../environments';
import directiveResolvers from './directiveResolvers';
import schemaDirectives from './schemaDirectives';

@Injectable()
export class GraphqlService implements GqlOptionsFactory {
  async createGqlOptions(): Promise<GqlModuleOptions> {
    return {
      typePaths: ['./**/*.graphql'],
      path: env.get('graphqlEndpoint'),
      cors: true,
      bodyParserConfig: {
        limit: '50mb',
      },
      schemaDirectives,
      directiveResolvers,
      playground: env.get('environment') === 'development',
    };
  }
}
