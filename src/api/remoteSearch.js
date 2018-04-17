import fetch from 'utils/fetch';

export function userSearch(username) {
  return fetch({
    url: '/search/user',
    method: 'get',
    params: { username }
  });
}
