import request from '../../utils/request';

const fetchUser = {
  query: () => request('/api/v0/user/1'),

  // create: (user: { name: string; role: string; note?: string; }) => request({
  //   url: '/api/v0/user',
  //   method: 'post',
  //   data: user
  // }),

  // update: (id: string | number, user: { name?: string; role?: string; note?: string; }) => request({
  //   url: `/api/v0/user/${id}`,
  //   method: 'patch',
  //   data: user
  // }),

  // drop: (id: string | number) => request({
  //   url: `/api/v0/user/${id}`,
  //   method: 'delete'
  // })
};

export default fetchUser;
