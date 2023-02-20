// 运行时配置

import { useModel, useSelector, useStore } from "@umijs/max";
import { history } from "@umijs/max";
import { useEffect, useState } from "react";

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://next.umijs.org/docs/api/runtime-config#getinitialstate

export async function getInitialState(): Promise<{ name: string; userState: { isLogin: boolean; userInfo: any; } }> {
  let userState = {
    isLogin: false,
    userInfo: null
  }
  return {
    name: '@umijs/max',
    userState
  };
}

export const layout = ({initialState}: any) => {
  return {
    onPageChange: () => {
      //根据用户状态引导用户进行指定的路由访问
      console.log(initialState)
      let { isLogin } = initialState
      if (!isLogin) {
        history.push('/login')
      }
    },
    logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
    menu: {
      locale: false,
    },
  };
};

//乾坤初始化全局数据
export function useQiankunStateForSlave() {
  const [masterState, setMasterState] = useState();
  const qiankunkun = 666
  // const type = useSelector((state: any)=>{
  //   return state.user
  // })
  const { initialState, setInitialState } = useModel('@@initialState')
  return {
    masterState,
    setMasterState,
    qiankunkun,
    initialState,
  };
};