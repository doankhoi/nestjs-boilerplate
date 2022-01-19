import 'reflect-metadata';
import {
  Module,
  CacheModule,
  NestModule,
  MiddlewareConsumer,
} from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {
  GraphqlService,
  CacheService,
  DateScalar,
  TypeOrmService,
} from '@configs';
import * as Resolvers from './resolvers';
import * as Services from '@services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthMiddleware } from '@common';

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
  ],
  controllers: [AppController],
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
