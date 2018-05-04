import fetch from 'utils/fetch';

export function page(query) {
  return fetch({
    url: '/api/jxkh/wtsb/dbrw',
    method: 'get',
    params: query
  });
}

export function addObj(obj) {
  return fetch({
    url: '/api/jxkh/wtsb/wtcj',
    method: 'post',
    data: obj,
    headers: {
    }
  });
}

export function getObj(id) {
  return fetch({
    url: '/api/admin/issue/getObj/',
    method: 'post',
    data: id
  });
}

export function getDict(dict) {
  return fetch({
    url: '/api/base/dict/' + dict + '/download',
    method: 'get'
  });
}

