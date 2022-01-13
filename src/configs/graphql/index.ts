import { Injectable } from '@nestjs/common';
import { GqlModuleOptions, GqlOptionsFactory } from '@nestjs/graphql';
import { join } from 'path';
import { env } from '../../environments';
import directiveResolvers from './directiveResolvers';
import schemaDirectives from './schemaDirectives';

@Injectable()
export class GraphqlService implements GqlOptionsFactory {
  async createGqlOptions(): Promise<GqlModuleOptions> {
    return {
      typePaths: ['./src/**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/generator/graphql.schema.ts'),
        outputAs: 'class',
      },

      path: env.get('graphqlEndpoint'),
      cors: true,
      bodyParserConfig: {
        limit: '50mb',
      },
      schemaDirectives,
      directiveResolvers,
      introspection: true,
      playground: env.get('environment') === 'development',
    };
  }
}
