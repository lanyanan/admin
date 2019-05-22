/** eslint-disabled */
import {
// getLogin
} from 'services/auth/login';
import {
  saveUserSession,
  getUserSession,
  // removeUserSession
} from 'utils/session';
// import Immutable from 'immutable';
// import { convertJsonToKeys } from 'utils/permissionTree';
import { setToken } from 'utils/tools';

export default {
  namespace: 'auth',

  state: {
    authorized: false,
    permit: ['system.list.list'],
    permissions: ['system.list.list'],
  },

  subscriptions: {
    // eslint-disable-next-line no-unused-vars
    setup({ history, dispatch }) {
      return history.listen(() => {
        dispatch({ type: 'getSession' });
      });
    },
  },

  effects: {
    // eslint-disable-next-line no-unused-vars
    *fetch({ payload }, { call, put }) {
      // eslint-disable-line
      yield put({ type: 'save' });
    },
    // eslint-disable-next-line no-unused-vars
    *getLogin({ payload }, { call, put }) {
      yield put({
        type: 'saveLoginInfo',
        payload: {
          authorized: true,
        },
      });
      // const { data } = yield getLogin(payload);
      // if (data.code === 0) {
      //   setToken(data.data.token);
      //   yield put({
      //     type: 'save',
      //     payload: {
      //       authorized: true,
      //       token: data.data.token,
      //       permit: data.data.permit,
      //     },
      //   });
      // }
    },
    *getSession(_, { put, select }) {
      const info = yield select(state => state.auth);
      if (info.authorized) return;
      const session = getUserSession();
      if (session && session.authorized) {
        yield put({
          type: 'save',
          payload: {
            ...session,
            loginStatus: 'success',
            authorized: true,
          },
        });
      }
    },
    // eslint-disable-next-line no-unused-vars
    *loginOut({ payload, history }, { call, put }) {
      yield put({
        type: 'save',
        payload,
      });
      history.replace('/auth');
      setToken('');
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
    saveLoginInfo(state, { payload }) {
      // const permissions = convertJsonToKeys((payload.auth_menus) ? payload.auth_menus : []);
      const newState = {
        ...payload,
        // permissions,
      };
      saveUserSession(newState);
      return { ...newState };
    },
  },
};
