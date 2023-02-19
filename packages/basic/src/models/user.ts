
import { useRequest } from 'ahooks';
import { useState } from 'react';
import { loadUserByAccount } from './api';

const enum UserType {
  student = 1,
  parent = 1 << 1,
  teacher = 1 << 2,
  admin = 1 << 3
}

interface User {
  name: string
  avatar: string
  token: string
  type: number
}

export default function useUser() {

  const [state, setState] = useState<null | User>(null)

  const { loading, runAsync } = useRequest(loadUserByAccount, {
    manual: true,
    onSuccess({ user }) {
      setState(user)
    }
  })

  return {
    user: state,
    login(account: string, password: string) {
      return runAsync(account, password)
    },
    logout() {
      setState(null)
    },
    loading
  }

}