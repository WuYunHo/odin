// 运行时配置x";
import { RunTimeLayoutConfig } from '@umijs/max';
import { Auth } from "./components";
import { useModel } from "@umijs/max";
import './app.less'

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://next.umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState() {

  return {

  };
}

export const layout: RunTimeLayoutConfig = ({initialState}) => {
  return {
    // 常用属性
    logo: 'https://www.szu.edu.cn/images/logo_03.png',
    layout: 'top',
    colorPrimary: '#881945',
    contentWidth: 'Fluid',
    token: {
      pageContainer: {
        paddingBlockPageContainerContent: 0,
        paddingInlinePageContainerContent: 0,
      }
    },
    // 其他属性见：https://procomponents.ant.design/components/layout#prolayout
    rightRender() {
      return <Auth />
    },
  };
};

//乾坤初始化全局数据
export function useQiankunStateForSlave() {
  return {
    ...useModel('user')
  };
}