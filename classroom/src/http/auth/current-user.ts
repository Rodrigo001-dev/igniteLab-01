import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export interface AuthUser {
  sub: string;
}

// vou criar o meu decorator
export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): AuthUser => {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;

    console.log('🚀 ~ file: current-user.ts:9 ~ req', req.user);

    return req.user;
  },
);
