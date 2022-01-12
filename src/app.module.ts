import 'reflect-metadata';
import { Module, CacheModule } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphqlService, CacheService } from '@configs';
import * as Resolvers from './resolvers';

@Module({
  imports: [
    GraphQLModule.forRootAsync({
      useClass: GraphqlService,
    }),
    CacheModule.register({
      useClass: CacheService,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, ...Object.values(Resolvers)],
})
export class AppModule {}
