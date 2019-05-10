import { encode, decode } from 'base64-utf8';
// import { tools as acTools } from '@dd01fe/admin-center';

const sessionId = 'userInfo';

// 获取用户会话信息
export const getUserSession = () => {
  const session = sessionStorage.getItem('userInfo');
  if (session) {
    return JSON.parse(decode(session));
  } else {
    return null;
  }
};

// 获取token
export const getToken = () => {
  const userInfo = getUserSession();
  if (userInfo) {
    return userInfo.token;
  } else {
    return '';
  }
};

// 获取userName
export const getUserName = () => {
  const userInfo = getUserSession();
  if (userInfo && userInfo.user) {
    return userInfo.user.username;
  } else {
    return '';
  }
};

// 获取project_id
export const getProjectId = () => {
  const userInfo = getUserSession();
  if (userInfo) {
    return userInfo.projectId;
  } else {
    return '';
  }
};

// 修改session内容并储存
export const setSessionForOne = (name, val) => {
  const session = sessionStorage.getItem('userInfo');
  let sessionObject = {};
  if (session) {
    sessionObject = JSON.parse(decode(session));
  }
  sessionObject[name] = val;
  console.log('sessionObject', sessionObject);
  saveUserSession(sessionObject);
};

/**
 * 存储用户会话信息
 * @param  {json} userInfo json格式的用户信息
 */
export const saveUserSession = (userInfo) => {
  const strInfo = JSON.stringify(userInfo);
  sessionStorage.setItem('userInfo', encode(strInfo));
  // alert(11111111);
  // acTools.saveUserSession(userInfo);
};

// 获取用户本地信息
export const getLocalUser = () => {
  const local = localStorage.getItem('userInfo');
  if (local) {
    return JSON.parse(decode(local));
  } else {
    return null;
  }
};

/**
 * 存储用户本地信息
 * @param  {json} userInfo json格式的用户信息
 */
export const saveLocalUser = (userInfo) => {
  const strInfo = JSON.stringify(userInfo);
  localStorage.setItem('userInfo', encode(strInfo));
};

/**
 * 移除用户会话信息
 */
export const removeUserSession = () => {
  sessionStorage.removeItem(sessionId);
  sessionStorage.removeItem('token');
};


// session跨标签解决方案
/* (function(){
  if (!sessionStorage.length) {
    localStorage.setItem('getSessionStorage', Date.now());
  };

  window.addEventListener('storage', function(event){
    if (event.key == 'getSessionStorage') {
      localStorage.setItem('sessionStorage', JSON.stringify(sessionStorage));
      localStorage.removeItem('sessionStorage');
    } else if (event.key == 'sessionStorage' && !sessionStorage.length) {
      let data = JSON.parse(event.newValue);
      for (let key in data) {
        sessionStorage.setItem(key, data[key]);
      }
    }
  });
})(); */
