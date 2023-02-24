import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: '@umijs/max',
    headerTheme: 'dark',
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
      name: 'product-商家分类发布',
      path: '/product-cfy',
      component: './Product-cfy',
    },
    {
      name: 'product-商家表格展示',
      path: '/product-table',
      component: './Product-table',
    },
    {
      name: 'product-用户表格展示',
      path: '/product-card',
      component: './Product-card',
    },
  ],
  npmClient: 'pnpm',
  qiankun: {
    slave: {
      enable: true
    },
  },

  proxy: {
    '/products': {
      'target': 'http://localhost:7001',
      'changeOrigin': true,
    }
  }
});
