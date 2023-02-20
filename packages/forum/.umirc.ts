import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: '论坛',
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
      name: '草稿箱',
      path: '/draft',
      component: './Draft',
  },
  ],
  npmClient: 'pnpm',
  qiankun: {
    slave: {
      enable: true
    },
  },
  proxy: {
    '/api': {
      'target': 'http://localhost:7001',
      'changeOrigin': true,
      "pathRewrite": { "^/api": ''}
    }
  },
});

