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
      redirect: '/home',
    },
    {
      name: '首页',
      path: '/home',
      component: './Home',
    },
    {
      name: '论坛',
      path: '/forum',
      component: './Forum',
    },
    {
      name: '小卖部',
      path: 'product',
      component: './Product'
    },
    {
      name: '校园展示',
      path: 'exhibition',
      component: './Exhibition'
    },
    {
      name: '政策公开',
      path: 'policy',
      component: './Policy'
    },
    {
      name: '我的',
      path: 'mine',
      component: './Mine'
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
        // {
        //   name: 'product',
        //   entry: '//localhost:8002'
        // },
        // {
        //   name: 'exhibition',
        //   entry: '//localhost:8001'
        // },
      ]
    },
  },
  proxy: {
    '/api/forum': {
      'target': 'http://localhost:8001',
      'changeOrigin': true,
      // "pathRewrite": { "^/api": ''}
    }
  },
});
