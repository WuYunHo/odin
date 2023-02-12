import { Controller, Get, Inject, Query } from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
import { UsersService } from '../service/users.service';

@Controller('/login')
export class APIController {
  @Inject()
  ctx: Context;

  @Inject()
  usersService: UsersService;

  // @Get('/get_user')
  // async getUser(@Query('uid') uid) {
  //   const user = await this.productService.getUser({ uid });
  //   return { success: true, message: 'OK', data: user };
  // }

  @Get('/userlogin')
  async userLogin(@Query('name') name: string,@Query('password') password: string) {
    const user = await this.usersService.usersLogin(name, password);
    return { success: true, message: 'OK', data: user };
  }
}
