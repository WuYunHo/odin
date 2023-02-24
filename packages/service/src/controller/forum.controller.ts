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

  @Post('/findDrafting')
  async findDrafting() {
    const draft = await this.forumService.findDrafting()
    return { success: true, message: 'OK', data: draft };
  }

  @Post('/findPubing')
  async findPubing() {
    const draft = await this.forumService.findPubing()
    return { success: true, message: 'OK', data: draft };
  }

  @Post('/pubArticle')
  async pubArticle(@Body('articleID') articleID: number) {
    const draft = await this.forumService.pubArticle(articleID)
    return { success: true, message: 'OK', data: draft };
  }

  @Post('/deleteArticle')
  async deleteArticle(@Body('articleID') articleID: number) {
    const draft = await this.forumService.deleteArticle(articleID)
    return { success: true, message: 'OK', data: draft };
  }

  @Post('/refuseArticle')
  async refuseArticle(@Body('articleID') articleID: number) {
    const draft = await this.forumService.refuseArticle(articleID)
    return { success: true, message: 'OK', data: draft };
  }

  @Post('/pubingArticle')
  async pubingArticle(@Body('articleID') articleID: number) {
    const draft = await this.forumService.pubingArticle(articleID)
    return { success: true, message: 'OK', data: draft };
  }

  @Post('/lightArticle')
  async lightArticle(@Body('articleID') articleID: number) {
    const draft = await this.forumService.lightArticle(articleID)
    return { success: true, message: 'OK', data: draft };
  }

  @Post('/collectArticle')
  async collectArticle(@Body('articleID') articleID: number) {
    const draft = await this.forumService.collectArticle(articleID)
    return { success: true, message: 'OK', data: draft };
  }

  @Post('/findFirstComment')
  async findFirstComment(@Body('articleID') articleID: number) {
    const comment = await this.forumService.findFirstComment(articleID)
    return { success: true, message: 'OK', data: comment };
  }

  @Post('/addFirstComment')
  async addFirstComment(@Body('articleID') articleID: number, @Body('context') context: string, @Body('userID') userID: number) {
    const comment = await this.forumService.addFirstComment(articleID, context, userID)
    return { success: true, message: 'OK', data: comment };
  }

  // @Get('/loadProducts')
  // async loadProducts() {
  //   const products = await this.productService.loadProducts();
  //   return { success: true, message: 'OK', data: products };
  // }
}
