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
  dva: {},
  routes: [
    {
      path: '/',
      // redirect: '/home',
      redirect: '/mine',
    },
    {
      name: '首页',
      path: '/home',
      component: './Home',
    },
    {
      name: '志愿活动',
      path: '/forum',
      component: './Forum',
    },
    {
      name: '纪念品',
      path: 'product',
      component: './Product'
    },
    {
      name: '校园展示',
      path: 'exhibition',
      component: './Exhibition'
    },
    {
      name: '信息公开',
      path: 'policy',
      component: './Policy'
    },
    {
      name: '我的',
      path: 'mine',
      component: './Mine'
    },
    {
      name: '测试页',
      path: 'test',
      component: './Test'
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
        },
        {
          name: 'testthree',
          entry: '//localhost:8003'
        },
        {
          name: 'exhibition',
          entry: '//localhost:8004'
        },
      ]
    },
  },
  proxy: {
    // '/api/forum': {
    //   'target': 'http://localhost:8001',
    //   'changeOrigin': true,
    //   // "pathRewrite": { "^/api": ''}
    // },
    // '/api/products': {
    //   'target': 'http://localhost:8002',
    //   'changeOrigin': true,
    //   // "pathRewrite": { "^/api": ''}
    // },
    '/api/products': {
      'target': 'http://localhost:7001',
      'changeOrigin': true,
      "pathRewrite": { "^/api": ''}
    },
    '/api/login': {
      'target': 'http://localhost:7001',
      'changeOrigin': true,
      "pathRewrite": { "^/api": ''}
    },
    '/api/forumapi': {
      'target': 'http://localhost:7001',
      'changeOrigin': true,
      "pathRewrite": { "^/api": ''}
    }
  },
});
