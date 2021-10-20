import {ObjectType, Field, ID} from "@nestjs/graphql";


@ObjectType()
export class User {
    
    @Field(() => ID)
    _id: string

    @Field(() => String)
    username: string

    @Field(() => String)
    email: string

    @Field(() => String)
    password: string

    @Field(() => String)
    avatar: string

    @Field(() => String)
    role: string
}