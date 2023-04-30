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
      redirect: '/Registration',
    },
    {
      name: '活动报名',
      path: '/registration',
      component: './Registration', 
    },
    {
      name: '论坛',
      path: '/home',
      component: './Home', 
    },
    {
      name: '发布帖子',
      path: '/edit',
      component: './Edit',
    },
    {
      name: '发布活动',
      path: '/actvedit',
      component: './actvEdit',
    },
    {
      name: '我的帖子',
      path: '/draft',
      component: './Draft',
    },
    {
      name: '我的活动',
      path: '/actvdraft',
      component: './actvDraft',
    },
    {
      name: '审核列表(帖子)',
      path: '/drafting',
      component: './Drafting',
      access: 'admin'
    },
    {
      name: '审核列表(活动)',
      path: '/actvdrafting',
      component: './actvDrafting',
      access: 'admin'
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

