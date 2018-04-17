import fetch from 'utils/fetch';

export function loginByEmail(usercode, password) {
  const data = {
    usercode,
    password
  };
  return fetch({
    url: '/jwt/token',
    method: 'post',
    data
  });
}

export function logout(token) {
  return fetch({
    url: '/jwt/invalid',
    method: 'post',
    params: { token }
  });
}

export function getInfo(token) {
  return fetch({
    url: '/api/admin/user/front/info',
    method: 'get',
    params: { token }
  });
}

export function getMenus(token) {
  return fetch({
    url: '/api/admin/user/front/menus',
    method: 'get',
    params: { token }
  });
}
