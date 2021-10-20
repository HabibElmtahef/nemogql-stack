import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose'
import { GraphQLModule } from '@nestjs/graphql'
import {AppResolver} from './app.resolver';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://next:next@cluster0.w7fib.mongodb.net/nestgql?retryWrites=true&w=majority'),
            GraphQLModule.forRoot({
              autoSchemaFile: true,
              playground: true,
              debug: false
            }),
            AuthModule
           ],
  providers: [AppService, AppResolver],
})
export class AppModule {}
