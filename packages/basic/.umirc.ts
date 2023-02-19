import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: ' '
  },
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      name: '首页',
      path: '/home',
      component: './Home',
    },
    {
      name: '权限演示',
      path: '/access',
      component: './Access',
    },
    {
      name: 'CRUD 示例',
      path: '/table',
      component: './Table',
    },
    {
      name: '小卖部',
      path: 'product',
      component: './Product'
    }
  ],
  npmClient: 'pnpm',
  qiankun: {
    master: {
      enable: true,
      apps: [
        {
          name: 'product',
          entry: '//localhost:8001',
        }
      ]
    },
  },
});
