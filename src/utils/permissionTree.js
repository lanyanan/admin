/**
 * 将json转换为tree需要的keys
 */
export const convertJsonToKeys = (json, keyPre = '') => {
  let keys = [];
  if (typeof json === 'object') {
    Object.entries(json).forEach(([key, val]) => {
      const key2 = `${keyPre}${key}`;
      keys.push(key2);
      if (typeof val.children === 'object') {
        keys = keys.concat(convertJsonToKeys(val.children, `${key2}.`));
      }
    });
  }
  return keys;
};

/**
 * 从所有菜单中找出第一条有访问权限的路由
 * @param {json}  menu        菜单配置
 * @param {array} permissions 权限列表
 * @return {string}           route中配置的path
 */
export const findFirstAuthPathFromMenu = (menu, permissions) => {
  let path = '';
  menu.some((m) => {
    if (m.path && typeof m.permit === 'undefined') { // 没有配置授权信息的页面视为有权限
      ({ path } = m);
      return true;
    }
    return permissions.some((it) => {
      if (it === m.permit) {
        ({ path } = m);
      } else if (Array.isArray(m.list)) {
        path = findFirstAuthPathFromMenu(m.list, permissions);
      } else if (Array.isArray(m)) {
        path = findFirstAuthPathFromMenu(m, permissions);
      }
      return !!path;
    });
  });
  return path;
};


const isPermit = (permit, permissions) => {
  return permissions.indexOf(permit) > -1;
};

const findFirstPathRoute = (menus, permissions) => {
  // console.log(menus, permissions);
  // eslint-disable-next-line array-callback-return
  let firstPath = '';
  // eslint-disable-next-line array-callback-return
  menus.every((item) => {
    if (isPermit(item.permit, permissions)) {
      if (item.list) {
        firstPath = findFirstPathRoute(item.list, permissions);
      } else {
        firstPath = item.path;
        return false;
      }
    } else {
      return true;
    }
  });
  return firstPath;
};
