import fetch from 'utils/fetch';

export function page(query) {
  return fetch({
    url: '/api/jxkh/wtsb/page',
    method: 'get',
    params: query
  });
}

export function addObj(obj) {
  return fetch({
    url: '/api/jxkh/wtsb/wtcj2',
    method: 'post',
    data: obj
  });
}

export function getObj(id) {
  return fetch({
    url: '/api/admin/issue/getObj/',
    method: 'post',
    data: id
  });
}

export function getDict() {
  return fetch({
    url: '/api/jxkh/kpzd/getAll',
    method: 'get'
  });
}

