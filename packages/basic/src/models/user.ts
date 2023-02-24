
import { useRequest } from 'ahooks';
import { useState } from 'react';
import { loadUserByAccount } from './api';

const enum UserType {
  student = 1,
  parent = 1 << 1,
  teacher = 1 << 2,
  business = 1 << 3,
  admin = 1 << 4
}

interface User {
  name: string
  avatar: string
  token: string
  type: number
  id: number
}

export default function useUser() {
  const [state, setState] = useState<null | User>(null)

  const { loading, runAsync } = useRequest(loadUserByAccount, {
    manual: true,
    onSuccess({ user }) {
      setState(user)
    }
  })

  const userType = state?.type || 0

  return {
    user: state,
    loading,
    login(account: string, password: string) {
      return runAsync(account, password)
    },
    logout() {
      setState(null)
    },
    get isStudent() {
      return userType & UserType.student
    },
    get isParent() {
      return userType & UserType.parent
    },
    get isTeacher() {
      return userType & UserType.teacher
    },
    get isBusiness() {
      return userType & UserType.business
    },
    get isAdmin() {
      return userType & UserType.admin
    }
  }

}