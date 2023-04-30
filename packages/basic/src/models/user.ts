
import { useRequest } from 'ahooks';
import { useState } from 'react';
import { loadUserByAccount, updateUserById, refresh } from './api';

const enum UserType {
  student = 1,
  parent = 1 << 1,
  teacher = 1 << 2,
  business = 1 << 3,
  admin = 1 << 4
}

interface User {
  id: number
  type: number
  tel: string
  addr: number
  voltime: number
  name: string
  // avatar: string
  // token: string
}

export default function useUser() {
  const [state, setState] = useState<null | User>(null)

  const { loading, runAsync } = useRequest(loadUserByAccount, {
    manual: true,
    // onSuccess({ user }) {
    //   setState(user)
    // }
    onSuccess(res) {
      console.log(res)
      if(res.data.state == 0 || res.data.state == 1){
        // console.log(res.data.state)
      }else{
        console.log(res.data)
        localStorage.setItem("token",JSON.stringify(res.data))

        console.log(JSON.parse(localStorage.getItem("token")))
        setState(JSON.parse(localStorage.getItem("token")))
        // setState(res.data)
      }
    }
  })

  const { runAsync:runFresh }  = useRequest(refresh , {
    manual: true,
    // ready: JSON.parse(localStorage.getItem("token")),
    onSuccess(res) {
      console.log(res)
      setState(res.data)
    }

  })

  const { run, runAsync:updateAsync } = useRequest(updateUserById, {
    manual: true,
    onSuccess(res) {
      setState(res.data)
      console.log(res)
    }
  })

  const userType = state?.type || 0

  return {
    user: state,
    loading,
    login(account: string, password: string) {
      console.log('model',account, password)
      return runAsync(account, password)
    },
    logout() {
      setState(null)
    },
    update(id: number, tel: string, addr: string, birth: string, major: string) {
      return run(id, tel, addr, birth, major)
    },
    fresh(id: number) {
      return runFresh(id)
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