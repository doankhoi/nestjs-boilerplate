import 'reflect-metadata';
import {
  Module,
  CacheModule,
  NestModule,
  MiddlewareConsumer,
} from '@nestjs/common';
import {
  CacheService,
  DateScalar,
  GraphqlService,
  MulterConfigService,
  TypeOrmService,
} from '@configs';
import { HttpModule } from '@nestjs/axios';
import { GraphQLModule } from '@nestjs/graphql';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthMiddleware } from '@common';

import * as Services from '@services';
import 'reflect-metadata';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as Resolvers from './resolvers';
import * as Controller from './controllers';

@Module({
  imports: [
    HttpModule,
    GraphQLModule.forRootAsync({
      useClass: GraphqlService,
    }),
    CacheModule.register({
      useClass: CacheService,
    }),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmService }),
    MulterModule.registerAsync({ useClass: MulterConfigService }),
  ],
  controllers: [AppController, ...Object.values(Controller)],
  providers: [
    AppService,
    ...Object.values(Resolvers),
    DateScalar,
    ...Object.values(Services),
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}
