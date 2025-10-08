import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: keyof any, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user; // hasil dari validate()
    console.log('user: ', user);

    // kalau dipanggil @CurrentUser('id') → cuma balikin id
    return data ? user?.[data] : user;
  },
);
