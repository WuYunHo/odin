import { Body, Controller, Fields, Files, Get, Inject, Post } from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
import { UsersService } from '../service/users.service';

import { CaptchaService } from '@midwayjs/captcha';

import { OSSService } from '@midwayjs/oss';
import { join } from 'path';

@Controller('/login')
export class APIController {
  @Inject()
  ctx: Context;

  @Inject()
  usersService: UsersService;

  @Inject()
  captchaService: CaptchaService;

  @Inject()
  ossService: OSSService;

  // @Get('/get_user')
  // async getUser(@Query('uid') uid) {
  //   const user = await this.productService.getUser({ uid });
  //   return { success: true, message: 'OK', data: user };
  // }

  @Post('/userlogin')
  async userLogin(@Body('account') account: string, @Body('password') password: string) {
    const user = await this.usersService.usersLogin(account, password);
    return { success: true, message: 'OK', data: user };
  }

  @Post('/usersUpdate')
  async usersUpdate(@Body('id') id: number, @Body('tel') tel: string, @Body('addr') addr: string, @Body('birth') birth: string, @Body('major') major: string) {
    const user = await this.usersService.usersUpdate(id, tel, addr, birth, major);
    return { success: true, message: 'OK', data: user };
  }

  @Post('/freshvoltime')
  async freshvoltime(@Body('volID') volID: number) {
    const order = await this.usersService.freshvoltime(volID);
    return { success: true, message: 'OK', data: order };
  }

  // 示例：获取图像验证码
  @Get('/get-image-captcha')
  async getImageCaptcha() {
    const { id, imageBase64 } = await this.captchaService.image({ width: 120, height: 40 });
    return {
      id,          // 验证码 id
      imageBase64, // 验证码 SVG 图片的 base64 数据，可以直接放入前端的 img 标签内
    }
  }

  // 验证验证码是否正确
  @Post('/check-captcha')
  async getCaptcha(@Body('id') id: string, @Body('answer') answer: string) {
    // const { id, answer } = this.ctx.request.body;
    const passed: boolean = await this.captchaService.check(id, answer);
    if (passed) {
      return 'passed';
    }
    return 'error';
  }

  @Post('/changePwd')
  async changePwd(@Body('account') account: string, @Body('cardmsg') cardmsg: string, @Body('password') password: string,) {
    const user = await this.usersService.changePwd(account, cardmsg, password);
    return { success: true, message: 'OK', data: user };
  }

  @Post('/getUserMsg')
  async getUserMsg(@Body('id') id: number) {
    const user = await this.usersService.getUserMsg(id);
    return { success: true, message: 'OK', data: user };
  }

  @Post('/upload')
  async upload(@Files() files: any, @Fields() fields: any) {
    /*
    files = [
      {
        filename: 'test.pdf',        // 文件原名
        data: '/var/tmp/xxx.pdf',    // mode 为 file 时为服务器临时文件地址
        fieldname: 'test1',          // 表单 field 名
        mimeType: 'application/pdf', // mime
      },
      {
        filename: 'test.pdf',        // 文件原名
        data: ReadStream,    // mode 为 stream 时为服务器临时文件地址
        fieldname: 'test2',          // 表单 field 名
        mimeType: 'application/pdf', // mime
      },
      // ...file 下支持同时上传多个文件
    ]

    */
    // console.log('files-name:', files[0].filename, 'files-src:', files[0].data);
    const reg = /files(\S*)/;
    // const filename = reg.exec(files[0].data)?.[1].trim();
    const execfilename = reg.exec(files[0].data);
    const filename: string = execfilename[1].slice(1);

    // const localFile = join(files[0].data.slice(0, 53), filename);
    const localFile = join(files[0].data.slice(0, files[0].data.length - filename.length - 1), filename);

    // @ts-ignore
    console.log('测试',files[0].data.slice(0, files[0].data.length - filename.length - 1))

    let imgUrl = ''

    await this.ossService.put(filename, localFile).then(res => {
      // console.log(res);
      imgUrl = res.url
    });

    // console.log(filename, execfilename, files[0].data.slice(0, 53));
    // console.log(localFile);
    return {
      // files,
      // fields,
      imgUrl,
    }
  }

  @Post('/getUserbyId')
  async getUserbyId(@Body('id') id: number) {
    const user = await this.usersService.getUserbyId(id);
    return { success: true, message: 'OK', data: user };
  }

  @Post('/addcash')
  async addcash(@Body('id') id: number, @Body('price') price: number) {
    const user = await this.usersService.addcash(id, price);
    return { success: true, message: 'OK', data: user };
  }

  @Post('/addvoltime')
  async addvoltime(@Body('userid') userid: number, @Body('duration') duration: number) {
    const user = await this.usersService.addvoltime(userid, duration);
    return { success: true, message: 'OK', data: user };
  }
}
