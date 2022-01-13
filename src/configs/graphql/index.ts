import { Injectable } from '@nestjs/common';
import { GqlModuleOptions, GqlOptionsFactory } from '@nestjs/graphql';
import { env } from '../../environments';
import directiveResolvers from './directiveResolvers';
import schemaDirectives from './schemaDirectives';
import { resolve } from 'path';
export * from './scalars';

@Injectable()
export class GraphqlService implements GqlOptionsFactory {
  async createGqlOptions(): Promise<GqlModuleOptions> {
    return {
      autoSchemaFile: resolve(
        process.cwd(),
        'src/generator/graphql.schema.gql',
      ),
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
