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
  dva: {},
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
      name: '发帖',
      path: '/edit',
      component: './Edit',
    },
    {
      name: '权限演示',
      path: '/access',
      component: './Access',
      access: 'canSeeAccess'
    },
    {
      name: '我的帖子',
      path: '/draft',
      component: './Draft',
    },
    {
      name: '审核列表',
      path: '/drafting',
      component: './Drafting',
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
  },
});

