import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const AccessToken = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const accessToken = ctx
      .switchToHttp()
      .getRequest()
      .headers.authorization.split('Bearer ')
      .at(-1);
    
      return accessToken;
  },
);
