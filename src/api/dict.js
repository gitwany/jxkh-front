import fetch from 'utils/fetch';

export function getDict(dictcode,pDm) {
  return fetch({
    url: '/api/base/dict/'+dictcode+'/download/'+pDm,
    method: 'get'
  });
}

export function getDept() {
  return fetch({
    url: '/api/admin/dept/tree',
    method: 'get'
  });
}



