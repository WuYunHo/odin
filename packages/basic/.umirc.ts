import {defineConfig} from '@umijs/max';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: '@umijs/max',
  },
  dva: {},
  routes: [
    {
      name: '登录',
      path: '/login',
      component: './Login',
      layout: false,
    },
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
      name: '论坛',
      path: '/forum',
      component: './Forum',
    },
    {
      name: '产品',
      path: '/product',
      component: './Product',
    },
  ],
  npmClient: 'pnpm',
  qiankun: {
    master: {
      enable: true,
      apps: [
        {
          name: 'forum',
          entry: '//localhost:8001',
        },
        {
          name: 'product',
          entry: '//localhost:8002'
        }
      ]
    },
  },
  proxy: {
    '/login/': {
      'target': 'http://localhost:7001',
      'changeOrigin': true,
    },
    '/api/': {
      'target': 'http://localhost:7001',
      'changeOrigin': true,
      "pathRewrite": { "^/api": ''}
    }
  },
});

