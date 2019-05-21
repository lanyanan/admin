import { getLogin } from '../services/login';
import { setToken } from '../utils/tool';

export default {
  namespace: 'auth',

  state: {
    loginState: false,
    permit: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {
      // eslint-disable-line
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      // eslint-disable-line
      yield put({ type: 'save' });
    },
    *getLogin({ payload }, { call, put }) {
      const { data } = yield getLogin(payload);
      if (data.code === 0) {
        setToken(data.data.token);
        yield put({
          type: 'save',
          payload: {
            loginState: true,
            token: data.data.token,
            permit: data.data.permit,
          },
        });
      }
    },
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
  },
};
