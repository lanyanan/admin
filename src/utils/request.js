import fetch from 'dva/fetch';
import { message } from 'antd';
// import { HEADER_TOKEN_NAME, BROWSER_HISTORY, ERP_VERSION, HEADER_VERSION_NAME, HEADER_PROJECT_NAME, FINANCE_VERSION } from 'constants';
// import { getToken, getProjectId } from './session';

// const getCenterOrigin = () => {
//   const auth = getUserSession();
//   return auth ? auth.centerOrigin : '';
// };

// const logout = () => {
//   const centerOrigin = getCenterOrigin();
//   removeUserSession();
//   window.location.href = `${centerOrigin}/login?logout=1`;
// };

const expireValveDuration = 10e3; // 接口过期处理后多少秒内保持静默，默认10秒
let expireValveOn = false; // 接口过期处理开关

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {
  // const token = getToken();
  // const projectId = getProjectId();
  // 配置默认headers
  const versionHeader = {};
  // if (/api\/erp\//.test(url)) {
  //   versionHeader[HEADER_VERSION_NAME] = ERP_VERSION;
  // }
  // if (/api\/finance\//.test(url)) {
  //   versionHeader[HEADER_VERSION_NAME] = FINANCE_VERSION;
  // }
  const headers = Object.assign({
    'Content-Type': 'application/json;charset=UTF-8',
    ...versionHeader,
  }, options && options.headers);
  if (options && options.body && (options.body instanceof FormData)) {
    delete headers['Content-Type'];
  }
  // if (token) {
  //   headers[HEADER_TOKEN_NAME] = token;
  // }
  // if (projectId) {
  //   headers[HEADER_PROJECT_NAME] = projectId;
  // }
  headers['Cache-Control'] = 'no-cache';
  headers.Pragma = 'no-cache';
  // 配置默认设置
  const settings = Object.assign({
    method: 'GET',
    mode: 'cors',
    credentials: 'include',
  }, options, { headers });
  // 修复url中多余的斜杠
  const fixUrl = url.replace(/\/\//g, '/').replace(/:\/([^/])/, '://$1');
  // 非GET方式不允许缓存
  // if (settings.method.toUpperCase() !== 'GET') {
  //   settings['Cache-Control'] = 'no-cache';
  // }

  return fetch(fixUrl, settings)
    .then(checkStatus)
    .then(parseJSON)
    .then((data) => {
      if (data.code === 1 && !expireValveOn) { // 会话已失效
        expireValveOn = true;
        // if (BROWSER_HISTORY) {
        //   window.location.href = '/logout';
        // } else {
        //   // logout();
        //   window.location.hash = '#/logout';
        // }
        setTimeout(() => (expireValveOn = false), expireValveDuration);
      }
      if (data.code === 3) { // 操作受限
        message.error('操作受限');
        // acTools.logout();
      }
      return { data };
    })
    .catch(err => ({ err }));
}
