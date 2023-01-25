import { Body, Controller, Get, Inject, Post } from '@midwayjs/decorator';
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
    await this.productService.saveProduct(name);
    return { success: true, message: 'OK', data: name };
  }

  @Get('/loadProducts')
  async loadProducts() {
    const products = await this.productService.loadProducts();
    return { success: true, message: 'OK', data: products };
  }
}
