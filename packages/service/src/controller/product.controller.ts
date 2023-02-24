import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Query,
} from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
import { ProductService } from '../service/product.service';
import { ProductTypeService } from '../service/productType.service';

@Controller('/products')
export class APIController {
  @Inject()
  ctx: Context;

  @Inject()
  productService: ProductService;

  @Inject()
  productTypeService: ProductTypeService;

  @Post('/addProductByName')
  async addProduct(
    @Body('name') name: string,
    @Body('type') type: string,
    @Body('price') price: number,
    @Body('count') count: number
  ) {
    const newProduct = await this.productService.saveProduct(
      name,
      type,
      price,
      count
    );
    return { success: true, message: 'OK', data: newProduct };
  }

  @Get('/findAllProducts')
  async findAllProducts() {
    const products = await this.productService.findAllProducts();
    // console.log(products);
    return { success: true, message: 'OK', data: products };
  }

  @Get('/findAllProductTypes')
  async findAllProductTypes() {
    const products = await this.productTypeService.findAllProductTypes();
    console.log(products);
    return { success: true, message: 'OK', data: products };
  }

  @Get('/findProductByName')
  async findProductByName(@Query('name') name: string) {
    const product = await this.productService.findProductByName(name);
    return { success: true, message: 'OK', data: product };
  }

  @Post('/update')
  async update(
    @Body('id') id: number,
    @Body('name') name: string,
    @Body('type') type: string,
    @Body('price') price: number,
    @Body('count') count: number
  ) {
    const updateProduct = await this.productService.update(
      id,
      name,
      type,
      price,
      count
    );
    return { success: true, message: 'OK', data: updateProduct };
  }

  @Get('/delete')
  async delete(@Query('name') name: string) {
    const deleteProduct = await this.productService.delete(name);
    return { success: true, message: 'OK', data: deleteProduct };
  }

  @Get('/paging')
  async paging(@Query('num') num: number) {
    const padingProduct = await this.productService.paging(num);
    return { success: true, message: 'OK', data: padingProduct };
  }
}
