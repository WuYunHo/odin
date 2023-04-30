import { Body, Controller, Get, Inject, Post } from '@midwayjs/decorator';
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
  async addArticle(@Body('context') context: string, @Body('userID') userID: number, @Body('title') title: string, @Body('state') state: number, @Body('imgURL') imgURL: string, @Body('username') username: string) {
    const newArticle = await this.forumService.saveArticle(context, userID, title, state, imgURL, username);
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

  @Post('/nolightArticle')
  async nolightArticle(@Body('articleID') articleID: number) {
    const draft = await this.forumService.nolightArticle(articleID)
    return { success: true, message: 'OK', data: draft };
  }

  @Post('/collectArticle')
  async collectArticle(@Body('articleID') articleID: number) {
    const draft = await this.forumService.collectArticle(articleID)
    return { success: true, message: 'OK', data: draft };
  }

  @Post('/nocollectArticle')
  async nocollectArticle(@Body('articleID') articleID: number) {
    const draft = await this.forumService.nocollectArticle(articleID)
    return { success: true, message: 'OK', data: draft };
  }

  @Post('/findFirstComment')
  async findFirstComment(@Body('articleID') articleID: number) {
    const comment = await this.forumService.findFirstComment(articleID)
    return { success: true, message: 'OK', data: comment };
  }

  @Post('/addFirstComment')
  async addFirstComment(@Body('articleID') articleID: number, @Body('context') context: string, @Body('userID') userID: number, @Body('userName') userName: string) {
    const comment = await this.forumService.addFirstComment(articleID, context, userID, userName)
    return { success: true, message: 'OK', data: comment };
  }

  @Post('/addSecondComment')
  async addSecondComment(@Body('tarcomID') tarcomID: number, @Body('context') context: string, @Body('userID') userID: number, @Body('userName') userName: string) {
    const comment = await this.forumService.addSecondComment(tarcomID, context, userID, userName)
    return { success: true, message: 'OK', data: comment };
  }

  @Post('/deleteComment')
  async deleteComment(@Body('comID') comID: number) {
    const comment = await this.forumService.deleteComment(comID)
    return { success: true, message: 'OK', data: comment };
  }

  @Post('/saveActivity')
  async saveActivity(@Body('actvname') actvname: string, @Body('actvaddr') actvaddr: string, @Body('actvtime') actvtime: string, @Body('actvduration') actvduration: number, @Body('actvtext') actvtext: string, @Body('leaderID') leaderID: number, @Body('leadername') leadername: string, @Body('leadertel') leadertel: string, @Body('needp') needp: number, @Body('imgURL') imgURL: string ) {
    const comment = await this.forumService.saveActivity(actvname, actvaddr, actvtime, actvduration, actvtext, leaderID, leadername, leadertel, needp, imgURL)
    return { success: true, message: 'OK', data: comment };
  }

  @Post('/findActivity')
  async findActivity(@Body('leaderID') leaderID: number) {
    const comment = await this.forumService.findActivity(leaderID)
    return { success: true, message: 'OK', data: comment };
  }

  @Post('/pubActivity')
  async pubActivity(@Body('actvid') actvid: number) {
    const comment = await this.forumService.pubActivity(actvid)
    return { success: true, message: 'OK', data: comment };
  }

  @Post('/deleteActivity')
  async deleteActivity(@Body('actvid') actvid: number) {
    const comment = await this.forumService.deleteActivity(actvid)
    return { success: true, message: 'OK', data: comment };
  }

  @Post('/refuseActivity')
  async refuseActivity(@Body('actvid') actvid: number) {
    const comment = await this.forumService.refuseActivity(actvid)
    return { success: true, message: 'OK', data: comment };
  }

  @Post('/pubingActivity')
  async pubingActivity(@Body('actvid') actvid: number) {
    const comment = await this.forumService.pubingActivity(actvid)
    return { success: true, message: 'OK', data: comment };
  }

  @Post('/findactvDrafting')
  async findactvDrafting() {
    const comment = await this.forumService.findactvDrafting()
    return { success: true, message: 'OK', data: comment };
  }

  @Post('/findactvPubing')
  async findactvPubing() {
    const comment = await this.forumService.findactvPubing()
    return { success: true, message: 'OK', data: comment };
  }

  @Post('/volSignUp')
  async volSignUp(@Body('actvid') actvid: number) {
    const comment = await this.forumService.volSignUp(actvid)
    return { success: true, message: 'OK', data: comment };
  }

  @Post('/volnoSignUp')
  async volnoSignUp(@Body('actvid') actvid: number) {
    const comment = await this.forumService.volnoSignUp(actvid)
    return { success: true, message: 'OK', data: comment };
  }

  @Post('/saveActivityList')
  async saveActivityList(@Body('actvid') actvid: number, @Body('menberID') menberID: number, @Body('menbername') menbername: string, @Body('menbertel') menbertel: string, ) {
    const comment = await this.forumService.saveActivityList(actvid, menberID, menbername, menbertel)
    return { success: true, message: 'OK', data: comment };
  }
  
  @Post('/findUseractv')
  async findUseractv(@Body('leaderID') leaderID: number) {
    const comment = await this.forumService.findUseractv(leaderID)
    return { success: true, message: 'OK', data: comment };
  }

  @Post('/findUseractvlist')
  async findUseractvlist(@Body('actvID') actvID: number) {
    const comment = await this.forumService.findUseractvlist(actvID)
    return { success: true, message: 'OK', data: comment };
  }


  @Get('/findComments')
  async findComments() {
    const comment = await this.forumService.findComments()
    return { success: true, message: 'OK', data: comment };
  }
  // @Get('/loadProducts')
  // async loadProducts() {
  //   const products = await this.productService.loadProducts();
  //   return { success: true, message: 'OK', data: products };
  // }

  @Get('/commentChart')
  async commentChart() {
    const comment = await this.forumService.commentChart()
    return { success: true, message: 'OK', data: comment };
  }

  @Get('/actvChart')
  async actvChart() {
    const comment = await this.forumService.actvChart()
    return { success: true, message: 'OK', data: comment };
  }

  @Post('/addCollect')
  async addCollect(@Body('userID') userID: number, @Body('articleID') articleID: number) {
    const comment = await this.forumService.addCollect(userID, articleID)
    return { success: true, message: 'OK', data: comment };
  }

  @Post('/cutCollect')
  async cutCollect(@Body('userID') userID: number, @Body('articleID') articleID: number) {
    const comment = await this.forumService.cutCollect(userID, articleID)
    return { success: true, message: 'OK', data: comment };
  }

  @Get('/findCollect')
  async findCollect() {
    const comment = await this.forumService.findCollect()
    return { success: true, message: 'OK', data: comment };
  }

  @Post('/addLight')
  async addLight(@Body('userID') userID: number, @Body('articleID') articleID: number) {
    const comment = await this.forumService.addLight(userID, articleID)
    return { success: true, message: 'OK', data: comment };
  }

  @Post('/cutLight')
  async cutLight(@Body('userID') userID: number, @Body('articleID') articleID: number) {
    const comment = await this.forumService.cutLight(userID, articleID)
    return { success: true, message: 'OK', data: comment };
  }

  @Get('/findLight')
  async findLight() {
    const comment = await this.forumService.findLight()
    return { success: true, message: 'OK', data: comment };
  }

  @Get('/findAllactvList')
  async findAllactvList() {
    const comment = await this.forumService.findAllactvList()
    return { success: true, message: 'OK', data: comment };
  }

  @Post('/cutactvList')
  async cutactvList(@Body('actvID') actvID: number, @Body('menberID') menberID: number) {
    const comment = await this.forumService.cutactvList(actvID, menberID)
    return { success: true, message: 'OK', data: comment };
  }

  @Post('/punchactv')
  async punchactv(@Body('actvid') actvid: number, @Body('userid') userid: number) {
    const comment = await this.forumService.punchactv(actvid, userid)
    return { success: true, message: 'OK', data: comment };
  }

  @Post('/finishactv')
  async finishactv(@Body('actvid') actvid: number, @Body('userid') userid: number) {
    const comment = await this.forumService.finishactv(actvid, userid)
    return { success: true, message: 'OK', data: comment };
  }

  @Post('/quitactv')
  async quitactv(@Body('actvid') actvid: number, @Body('userid') userid: number) {
    const comment = await this.forumService.quitactv(actvid, userid)
    return { success: true, message: 'OK', data: comment };
  }
}
