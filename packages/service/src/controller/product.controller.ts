import { Inject, Controller, Post, Body } from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
import { ProductService } from '../service/product.service';

@Controller('/product')
export class APIController {
  @Inject()
  ctx: Context;

  @Inject()
  productService: ProductService;

  // @Get('/get_user')
  // async getUser(@Query('uid') uid) {
  //   const user = await this.productService.getUser({ uid });
  //   return { success: true, message: 'OK', data: user };
  // }

  @Post('/addProductByName')
  async addProduct(@Body('name') name: string) {
    this.productService.saveProduct(name);
    return { success: true, message: 'OK', data: name };
  }
}
