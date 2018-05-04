import fetch from 'utils/fetch';

export function page(query, form) {
  return fetch({
    // url: '/api/jxkh/wtsb/page',
    url: '/api/jxkh/wtcl/dbrw?page=' + query.page + '&limit=' + query.limit,
    method: 'post',
    data: {
      form
    }
  });
}

export function addObj(obj) {
  return fetch({
    url: '/api/jxkh/wtcl/web/wtcj',
    method: 'post',
    data: obj
  });
}

export function uploadImg(obj) {
  return fetch({
    url: '/api/jxkh/wtcl/web/tpsc',
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

export function getDict(dict, pdm) {
  return fetch({
    url: '/api/base/dict/' + dict + '/download/' + pdm,
    method: 'get'
  });
}

export function getOne(id) {
  return fetch({
    url: '/api/jxkh/wtcl/hqxq/' + id,
    method: 'get'
  });
}

export function getImg(uuid) {
  return fetch({
    url: '/api/jxkh/wtcl/hqzp64/' + uuid,
    method: 'get'
  });
}

export function fp(id, taskId, jddm) {
  return fetch({
    url: '/api/jxkh/wtcl/qfp',
    method: 'post',
    data: {
      id,
      taskId,
      jddm
    }
  });
}

export function jdfp(id, taskId, userId) {
  return fetch({
    url: '/api/jxkh/wtcl/jdfp',
    method: 'post',
    data: {
      id,
      taskId,
      userId
    }
  });
}

export function zg(id, taskId, zghzp) {
  return fetch({
    url: '/api/jxkh/wtcl/jdzg',
    method: 'post',
    data: {
      id,
      taskId,
      zghzp
    }
  });
}

export function sh(id, taskId, status) {
  return fetch({
    url: '/api/jxkh/wtcl/zgsh',
    method: 'post',
    data: {
      id,
      taskId,
      shjg: status
    }
  });
}

export function workflow(id) {
  return fetch({
    url: '/api/jxkh/wtcl/rwlc/' + id,
    method: 'get'
  });
}

