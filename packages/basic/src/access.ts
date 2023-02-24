export default (initialState: { userState: any; }) => {
  // 在这里按照初始化数据定义项目中的权限，统一管理
  // 参考文档 https://next.umijs.org/docs/max/access

  let { userState } = initialState
  // console.log(userState.isLogin)
  // const canSeeAdmin = !!(
  //   initialState && initialState.name !== 'dontHaveAccess'
  // );
  return {
    // canSeeAdmin,
    canReadAssess: userState?.isLogin == true
  };
};
