import qs from 'qs';
import request from 'utils/request';

export async function getList(query) {
  const querystring = qs.stringify(query);
  const option = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
  };

  return request(`project/list?${querystring}`, option);
}

export async function postFun(query) {
  const querystring = qs.stringify(query);
  const option = {
    method: 'POST',
    body: querystring,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
  };
  return request(`post/list?${querystring}`, option);
}
