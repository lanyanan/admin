import qs from 'qs';
import { HEADER_TOKEN_NAME } from 'constants';
import { getUserSession } from './session';

/**
 * 下载文件
 * @param  {string} url    文件/接口地址
 * @param  {String} method 请求方式，缺省为GET，也可用POST
 * @param  {object} data   要额外发送的表单数据
 */
export default (url, method = 'GET', data = null) => {
  const oldIframe = document.getElementById('__downloadfile_iframe__');
  const iframe = oldIframe || document.createElement('iframe');
  const form = document.createElement('form');
  // 解出url中的data
  const pathname = url.replace(/\?.*$|#.*$/g, '');
  const query = url.indexOf('?') > -1 ? qs.parse(url.replace(/^.+\?|#.*$/g, '')) : {};
  const session = getUserSession();
  if (session && session.token) {
    query[HEADER_TOKEN_NAME] = session.token;
  }
  const formData = Object.assign(method === 'GET' ? query : {}, data);
  iframe.setAttribute('id', '__downloadfile_iframe__');
  iframe.setAttribute('style', 'display:none');
  form.setAttribute('method', method);
  form.setAttribute('action', `${pathname}?${qs.stringify(query)}`);
  Object.keys(formData).forEach((key) => {
    const input = document.createElement('input');
    input.setAttribute('name', key);
    input.setAttribute('value', formData[key]);
    form.appendChild(input);
  });
  if (!oldIframe) document.body.appendChild(iframe);
  iframe.contentDocument.body.appendChild(form);
  form.submit();
};
