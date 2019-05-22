/* eslint no-underscore-dangle: ["error", { "allow": ["_store", "_history"] }] */
import { message } from 'antd';

/**
 * 路由授权函数
 * @param route {Object} 路由信息
 * @param app   {Object} dva app
 */
export const routeGrantor = (route, app) => {
  const { auth } = app._store.getState();
  console.log(route);
  if (!auth.authorized) { // 如果未登录，则引导登录
    app._history.push('/login');
    return false;
  }
  if (route.permit) {
    const permits = auth.permissions;
    console.log(permits, (!permits.some(it => it === route.permit)));
    if (!permits.some(it => it === route.permit)) {
      message.error('无权访问', 3, () => {
        app._history.replace('/');
      });
      return false;
    }
  }
  return true;
};
