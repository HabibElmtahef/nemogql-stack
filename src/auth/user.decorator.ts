import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from '@nestjs/graphql'

export const CurrentUser = createParamDecorator(
    (data: unknown, context: ExecutionContext) => {
        const { id, email, role } = GqlExecutionContext
        .create(context).getContext().req.user

        return { id, email, role }
    }
)