
import { useRequest } from 'ahooks';
import { useState } from 'react';
// import { loadUserByAccount } from './api';
import { queryArticleList } from './api';

// interface User {
//   name: string
//   avatar: string
//   token: string
//   type: number
//   id: number
// }

export default function useUser() {

  // const [state, setState] = useState<null | User>(null)
  const [articledata, setarticledata] = useState({})

  const { loading, runAsync } = useRequest(queryArticleList, {
    manual: false,
    onSuccess({ data }) {
      // setState(user)
      setarticledata(data)
    }
  })

  // const userType = state?.type || 0

  return {
    // user: state,
    loading,
    articledata,
    loadarticles(){
      return runAsync()
    },
    // login(account: string, password: string) {
    //   return runAsync(account, password)
    // },
    // logout() {
    //   setState(null)
    // },
    // get isStudent() {
    //   return userType & UserType.student
    // },
    // get isParent() {
    //   return userType & UserType.parent
    // },
    // get isTeacher() {
    //   return userType & UserType.teacher
    // },
    // get isBusiness() {
    //   return userType & UserType.business
    // },
    // get isAdmin() {
    //   return userType & UserType.admin
    // }
  }

}