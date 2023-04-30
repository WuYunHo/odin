import { useModel } from "@umijs/max";

export default (initialState: API.UserInfo) => {
  // 在这里按照初始化数据定义项目中的权限，统一管理
  // 参考文档 https://next.umijs.org/docs/max/access

  const masterProps = useModel('@@qiankunStateFromMaster');
  console.log(masterProps.user)
  return {
    admin: masterProps.user.type === 3,
    student: masterProps.user.type === 0 || masterProps.user.type === 3,
    vol:  masterProps.user.type === 1 || masterProps.user.type === 3,
    seller: masterProps.user.type === 2 || masterProps.user.type === 3,
  };
};
