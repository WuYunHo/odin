import { MidwayConfig } from '@midwayjs/core';
import { Activity, Activitylist, Article, Collect, Comment, Light } from '../entity/forum';
import { Users } from '../entity/user';
// '../entity/product';
import { Cart, Orderprdt, Orders, Product } from '../entity/product';
import { Product_type, Product_region } from '../entity/product_type';

import { uploadWhiteList } from '@midwayjs/upload';
import { tmpdir } from 'os';
import { join } from 'path';

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1674324099731_3132',
  koa: {
    port: 7001,
  },
  typeorm: {
    dataSource: {
      default: {
        /**
         * 单数据库实例
         */
        type: 'mysql',
        host: '124.222.63.209',
        port: 3308,
        username: 'root',
        password: 'root',
        database:
          process.env.MIDWAY_SERVER_ENV === 'prod' ? 'db_release' : 'db_dev',
        synchronize: true, // 如果第一次使用，不存在表，有同步的需求可以写 true，注意会丢数据
        logging: false,

        // 配置实体模型
        entities: [Users, Article, Comment, Product, Orders, Product_type, Product_region, Activity, Activitylist, Collect, Light, Cart, Orderprdt],
      },
    },
  },
  upload: {
    // mode: UploadMode, 默认为file，即上传到服务器临时目录，可以配置为 stream
    mode: 'file',
    // fileSize: string, 最大上传文件大小，默认为 10mb
    fileSize: '10mb',
    // whitelist: string[]，文件扩展名白名单
    whitelist: uploadWhiteList.filter(ext => ext !== '.pdf'),
    // tmpdir: string，上传的文件临时存储路径
    tmpdir: join(tmpdir(), 'midway-upload-files'),
    // cleanTimeout: number，上传的文件在临时目录中多久之后自动删除，默认为 5 分钟
    cleanTimeout: 5 * 60 * 1000,
    // base64: boolean，设置原始body是否是base64格式，默认为false，一般用于腾讯云的兼容
    base64: false,
    // 仅在匹配路径到 /api/upload 的时候去解析 body 中的文件信息
    // match: /\/api\/upload/,
    // match: /\/login\/upload/,
    // ignore: /\/api/,
  },
  oss: {
    client: {
      accessKeyId: 'LTAI5t6xC93ELC7mk9N99BGT',
      accessKeySecret: 'uHPR0aJuJtgYeCBIYrrBooKRRqmmal',
      bucket: 'szuodin',
      endpoint: 'oss-cn-shenzhen.aliyuncs.com', //https://github.com/ali-sdk/ali-oss/
      timeout: '60s',
    },
  },
} as MidwayConfig;
