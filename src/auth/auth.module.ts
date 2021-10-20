import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import {MongooseModule} from '@nestjs/mongoose';
import {User, UserSchema} from './Schemas/user.schema';
import {JwtStrategy} from './jwt.strategy';
import {JwtModule} from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema
      }
    ]),
    JwtModule.register({
      secret: 'hardPassword',
      signOptions: { expiresIn: '2d' }
    })
  ],
  providers: [AuthService, AuthResolver, JwtStrategy]
})
export class AuthModule {}
