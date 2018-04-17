const getters = {
  sidebar: state => state.app.sidebar,
  visitedViews: state => state.app.visitedViews,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  username: state => state.user.username,
  usercode: state => state.user.usercode,
  deptname: state => state.user.deptname,
  deptcode: state => state.user.deptcode,
  introduction: state => state.user.introduction,
  status: state => state.user.status,
  roles: state => state.user.roles,
  menus: state => state.user.menus,
  elements: state => state.user.elements,
  setting: state => state.user.setting,
  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters,
  permissionMenus: state => state.user.permissionMenus
};
export default getters
