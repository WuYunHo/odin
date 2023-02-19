import { request } from '@umijs/max';

export function loadUserByAccount(account: string, password: string) {

  return request('/api/user/loadUserByAccount', {
    method: 'POST',
    params: {
      account,
      password
    }
  })
}