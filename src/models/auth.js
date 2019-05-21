/** eslint-disabled */
import { getLogin } from '../services/login';
import { setToken } from '../utils/tool';

export default {
  namespace: 'auth',

  state: {
    loginState: false,
    permit: [],
  },

  subscriptions: {
    // eslint-disable-next-line no-unused-vars
    setup({ dispatch, history }) {
      // eslint-disable-line
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
  },
};
