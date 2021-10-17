import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetJwtUser = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    const { user } = ctx.switchToHttp().getRequest();
    return user;
  },
);
