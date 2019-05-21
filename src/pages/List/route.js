import List from './container/index';
import ListModal from './modal/list';

export default [
  {
    breadCrumb: '列表',
    path: '/list/index',
    component: List,
    models: ListModal,
    // permmit: 'system.list.list',
  },
];
