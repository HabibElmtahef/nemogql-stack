import { ObjectType, Field } from '@nestjs/graphql'
import { User } from './User'

@ObjectType()
export class LoggedUser {

    @Field(() => User)
    user: User

    @Field(() => String)
    token: string
}