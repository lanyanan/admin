// import { queryNotices } from '@/services/api';
import { getList } from 'services/list/index';
// import { parseSearch } from 'utils/tools';

export default {
  namespace: 'list',

  state: {
    total: 0,
    list: [],
  },

  effects: {
    *getList({ payload }, { dispatch }) {
      const { data, code } = yield getList(payload);
      if (code === 0) {
        dispatch({
          type: 'save',
          payload: data,
        });
      }
    },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },

  subscriptions: {
    setup({
      history,
      // dispatch
    }) {
      return history.listen(({
        pathname, search,
      }) => {
        console.log(pathname, search);
        // const query = parseSearch(search);
        // dispatch({
        //   type: 'save',
        //   payload: {
        //     pathname,
        //     query,
        //   },
        // });
      });
    },
  },
};
