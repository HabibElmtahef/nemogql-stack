import {UseGuards} from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {AuthService} from './auth.service';
import {LoginInput} from './Dto/LoginInput';
import {RegisterInput} from './Dto/RegisterInput';
import {LoggedUser} from './LoggedUser';
import { User } from './User'
import {CurrentUser} from './user.decorator';
import {GqlAuthGuard} from './user.guard';

@Resolver()
export class AuthResolver {
    constructor(private readonly service: AuthService) {}

    @Mutation(() => User)
    public regiser(@Args('input') input: RegisterInput) {
        return this.service.register(input)
    }

    @Query(() => LoggedUser)
    public login(@Args('input') input: LoginInput) {
        return this.service.login(input)
    }

    @Query(() => User)
    @UseGuards(GqlAuthGuard)
    public me(@CurrentUser() user: any) {
        return this.service.me(user.id)
    }
}
