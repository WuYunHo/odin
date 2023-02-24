import { request } from '@umijs/max';

export function queryArticleList() {

  return request('/api/forum/queryArticleList', {
    method: 'GET',
  })
}

export function querypubArticleList() {

  return request('/api/forum/querypubArticleList', {
    method: 'GET',
  })
}