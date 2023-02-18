import { MidwayConfig } from '@midwayjs/core';
import { Product } from '../entity/product';
import { Product_type } from '../entity/product_type';

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
        port: 3306,
        username: 'root',
        password: 'root',
        database:
          process.env.MIDWAY_SERVER_ENV === 'prod' ? 'db_release' : 'db_dev',
        synchronize: true, // 如果第一次使用，不存在表，有同步的需求可以写 true，注意会丢数据
        logging: false,

        // 配置实体模型
        entities: [Product, Product_type],
      },
    },
  },
} as MidwayConfig;
