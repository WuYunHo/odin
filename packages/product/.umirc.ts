import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: '商品',
    headerTheme: 'dark',
  },
  routes: [
    {
      path: '/',
      redirect: '/product-card',
    },
    // {
    //   name: '首页',
    //   path: '/home',
    //   component: './Home',
    // },
    {
      name: '首页',
      path: '/product-card',
      component: './Product-card',
      // access: 'student',
    },
    {
      name: '分类发布',
      path: '/product-cfy',
      component: './Product-cfy',
      access: 'admin',
    },
    {
      name: '商品发布',
      path: '/product-table',
      component: './Product-table',
      access: 'seller',
    },
    {
      name: '订单',
      path: '/order',
      component: './Order',
      access: 'vol',
    },
    {
      path: '/test',
      component: './Test',
    },
  ],
  npmClient: 'pnpm',
  qiankun: {
    slave: {
      enable: true
    },
  },

  proxy: {
    '/api/': {
      'target': 'http://localhost:7001',
      'changeOrigin': true,
      "pathRewrite": { "^/api": ''}
    }
  }
});
