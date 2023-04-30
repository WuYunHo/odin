import { request } from '@umijs/max';

export function loadUserByAccount(account: string, password: string) {
  console.log('model api',account, password )

  // return request('/api/user/loadUserByAccount', {
  //   method: 'POST',
  //   params: {
  //     account,
  //     password
  //   }
  // })

  return request('/api/login/userlogin', {
    method: 'POST',
    data: {
      account,
      password,
    }
  })
}

export function updateUserById(id: number, tel: string, addr: string, birth: string, major: string) {

  return request('/api/login/usersUpdate', {
    method: 'POST',
    data: {
      id,
      tel,
      addr,
      birth,
      major,
    }
  })
}

export function refresh(id: number) {

  return request('/api/login/getUserbyId', {
    method: 'POST',
    data: {
      id,
    }
  })
}