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
import { ProductTypeService} from '../service/productType.service';

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
    @Body('count') count: number,
    @Body('sellerID') sellerID: number,
    @Body('sellerName') sellerName: string,
    @Body('descriptions') descriptions: string,
    @Body('region') region: string,
    @Body('imgUrl') imgUrl: string,
  ) {
    const newProduct = await this.productService.saveProduct(
      name,
      type,
      price,
      count,
      sellerID,
      sellerName,
      descriptions,
      region,
      imgUrl
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
    return { success: true, message: 'OK', data: products };
  }

  @Get('/findAllProductRegions')
  async findAllProductRegions() {
    const regions = await this.productTypeService.findAllProductRegions();
    return { success: true, message: 'OK', data: regions };
  }

  @Post('/createNewProductTypes')
  async createNewProductTypes(@Body('producttype') producttype:string) {
    const newtype = await this.productTypeService.createNewProductTypes(producttype);
    console.log(newtype);
    return { success: true, message: 'OK', data: newtype };
  }

  @Post('/createNewProductRegions')
  async createNewProductRegions(@Body('content') content:string) {
    const newregion = await this.productTypeService.createNewProductRegions(content);
    return { success: true, message: 'OK', data: newregion };
  }

  @Get('/findProductByName')
  async findProductByName(@Query('name') name: string) {
    const product = await this.productService.findProductByName(name);
    return { success: true, message: 'OK', data: product };
  }

  @Get('/findProductByRegion')
  async findProductByRegion(@Query('region') region: string) {
    const product = await this.productService.findProductByRegion(region);
    return { success: true, message: 'OK', data: product };
  }

  @Post('/update')
  async update(
    @Body('id') id: number,
    @Body('name') name: string,
    @Body('type') type: string,
    @Body('price') price: number,
    @Body('count') count: number,
    @Body('descriptions') descriptions: string
  ) {
    const updateProduct = await this.productService.update(
      id,
      name,
      type,
      price,
      count,
      descriptions
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

  @Post('/saveOrder')
  async saveOrder(
    @Body('sellerID') sellerID: number,
    @Body('buyerID') buyerID: number,
    @Body('buyertel') buyertel: string,
    @Body('buyeraddr') buyeraddr: string,
    @Body('context') context: string,
    @Body('price') price: number
  ){
    const newOrder = await this.productService.saveOrder(
      sellerID,
      buyerID,
      buyertel,
      buyeraddr,
      context,
      price
    );
    return { success: true, message: 'OK', data: newOrder };
  }

  @Post('/removeOrder')
  async removeOrder(@Body('id') id: number) {
    const order = await this.productService.removeOrder(id);
    // console.log(products);
    return { success: true, message: 'OK', data: order };
  }

  @Get('/findOrder')
  async findOrder() {
    const order = await this.productService.findOrder();
    // console.log(products);
    return { success: true, message: 'OK', data: order };
  }

  @Get('/findsellerOrder')
  async findsellerOrder(@Query('sellerID') sellerID: number) {
    const order = await this.productService.findsellerOrder(sellerID);
    return { success: true, message: 'OK', data: order };
  }

  @Get('/findvolOrder')
  async findvolOrder(@Query('volID') volID: number) {
    const order = await this.productService.findvolOrder(volID);
    return { success: true, message: 'OK', data: order };
  }

  @Get('/finduserOrder')
  async finduserOrder(@Query('buyerID') buyerID: number) {
    const order = await this.productService.finduserOrder(buyerID);
    return { success: true, message: 'OK', data: order };
  }

  @Post('/takeOrder')
  async takeOrder(@Body('id') id: number, @Body('volID') volID: number, @Body('volname') volname: string, @Body('voltel') voltel: string) {
    const order = await this.productService.takeOrder(id, volID, volname, voltel);
    return { success: true, message: 'OK', data: order };
  }

  @Post('/finishOrder')
  async finishOrder(@Body('id') id: number) {
    const order = await this.productService.finishOrder(id);
    return { success: true, message: 'OK', data: order };
  }

  @Post('/changeProductCount')
  async changeProductCount(@Body('id') id: number, @Body('number') number: number) {
    const order = await this.productService.changeProductCount(id, number);
    return { success: true, message: 'OK', data: order };
  }

  @Post('/backProductCount')
  async backProductCount(@Body('id') id: number, @Body('number') number: number) {
    const order = await this.productService.backProductCount(id, number);
    return { success: true, message: 'OK', data: order };
  }

  @Post('/addCart')
  async addCart(@Body('prdtID') prdtID: number, @Body('userID') userID: number, @Body('count') count: number) {
    const order = await this.productService.addCart(prdtID, userID, count);
    return { success: true, message: 'OK', data: order };
  }

  @Post('/cutCart')
  async cutCart(@Body('prdtID') prdtID: number, @Body('userID') userID: number) {
    const order = await this.productService.cutCart(prdtID, userID);
    return { success: true, message: 'OK', data: order };
  }

  @Post('/findCart')
  async findCart(@Body('userID') userID: number) {
    const order = await this.productService.findCart(userID);
    return { success: true, message: 'OK', data: order };
  }

  @Post('/findCartByid')
  async findCartByid(@Body('prdtID') prdtID: number) {
    const order = await this.productService.findCartByid(prdtID);
    return { success: true, message: 'OK', data: order };
  }

  @Post('/addOrderPrdt')
  async addOrderPrdt(@Body('orderid') orderid: number,@Body('prdtid') prdtid: number,@Body('count') count: number,) {
    const order = await this.productService.addOrderPrdt(orderid, prdtid, count);
    return { success: true, message: 'OK', data: order };
  }

  @Post('/cutOrderPrdt')
  async cutOrderPrdt(@Body('orderid') orderid: number) {
    const order = await this.productService.cutOrderPrdt(orderid);
    return { success: true, message: 'OK', data: order };
  }

  @Post('/findOrderPrdt')
  async findOrderPrdt(@Body('orderid') orderid: number) {
    const order = await this.productService.findOrderPrdt(orderid);
    return { success: true, message: 'OK', data: order };
  }
}
