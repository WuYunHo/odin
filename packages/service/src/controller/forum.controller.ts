import { Body, Controller, Inject, Post } from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
import { ForumService } from '../service/forum.service';

@Controller('/forumapi')
export class APIController {
  @Inject()
  ctx: Context;

  @Inject()
  forumService: ForumService;

  // @Get('/get_user')
  // async getUser(@Query('uid') uid) {
  //   const user = await this.productService.getUser({ uid });
  //   return { success: true, message: 'OK', data: user };
  // }

  @Post('/addArticle')
  async addArticle(@Body('context') context: string, @Body('userID') userID: number, @Body('title') title: string, @Body('state') state: number) {
    const newArticle = await this.forumService.saveArticle(context, userID, title, state);
    return { success: true, message: 'OK', data: newArticle };
  }

  @Post('/findDraft')
  async findDraft(@Body('userID') userID: number) {
    const draft = await this.forumService.findDraft(userID)
    return { success: true, message: 'OK', data: draft };
  }

  // @Get('/loadProducts')
  // async loadProducts() {
  //   const products = await this.productService.loadProducts();
  //   return { success: true, message: 'OK', data: products };
  // }
}
