import * as Loadable from 'react-loadable';
import LoadingComponent from '../pages/Loading';

export const menus = [
  {
    icon: 'home',
    id: '/home',
    label: 'Home',
    path: '/home'
  },
  {
    icon: 'user',
    id: 'users',
    label: '用户管理',
    path: '/users',
    sub: [
      { id: '/users/customer', label: '前台用户', path: '/users/customer' },
      { id: '/users/admin', label: '后台用户', path: '/users/admin' }
    ]
  },
  {
    icon: 'area-chart',
    id: '/echarts',
    label: 'Echarts',
    path: '/echarts'
  },
  {
    icon: 'cloud-o',
    id: '/404',
    label: '404',
    path: '/404'
  }
];

export const getDefaultSelected = (location: { [key: string]: string | any }) => {
  const initStr = '/home';
  const pathname = location.pathname;
  return pathname === '/' ? initStr : pathname;
};

export const getDefaultOpen = (s: string, menuArr: any[]) => {
  let str = '';
  const k = s.split('/')[1] || null;
  if (k) {
    try {
      menuArr.forEach(m => {
        if (m.id === k && m.sub) {
          str = m.id;
          throw new Error('exit-forEach');
        }
      });
    } catch (e) {
      if (e.message !== 'exit-forEach') {
        throw e;
      }
    }
  }
  return str;
};

export const getAsyncComponent = (entry: any) => {
  return Loadable({
    delay: 200, // 200ms
    loader: entry,
    loading: LoadingComponent,
    timeout: 10000 // 10s
  });
};
