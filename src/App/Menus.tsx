import { Menu } from 'antd';
import * as React from 'react';
import { Link } from 'react-router-dom';

interface Iprops {
  pathname: string;
  style?: React.CSSProperties;
  onMenuClick?: () => void;
}

// config menus
const menuItems = [
  {
    id: '/home',
    label: 'Home',
    path: '/home'
  },
  {
    id: 'users',
    label: '用户管理',
    path: '/users',
    sub: [
      { id: '/users/customer', label: '前台用户', path: '/users/customer' },
      { id: '/users/admin', label: '后台用户', path: '/users/admin' }
    ]
  },
  {
    id: '/about',
    label: 'About',
    path: '/about'
  },
  {
    id: '/echarts',
    label: 'Echarts',
    path: '/echarts'
  },
  {
    id: '/404',
    label: '404',
    path: '/404'
  }
];

const getDefaultSelectedKey = (pathname: string) => {
  const initStr = '/home';

  const arr = pathname.split('/');
  if (arr.length > 1) {
    const k = arr[1];
    return k ? pathname : initStr;
  }
  return pathname;
};

class MenusComponent extends React.Component<Iprops, {}> {

  handleMenuClick = () => {
    const { onMenuClick } = this.props;
    if (onMenuClick) {
      onMenuClick();
    }
  }

  render() {
    const defaultSelectKey = getDefaultSelectedKey(this.props.pathname);

    return (
      <Menu
        theme="light"
        mode="horizontal"
        selectedKeys={[defaultSelectKey]}
        style={{ ...this.props.style }}
      >
        {menuItems.map(i => (
          i.sub ?
            <Menu.SubMenu
              key={i.id}
              title={<span>{i.label}</span>}
            >
              {i.sub.map(sub => (
                <Menu.Item key={sub.id}>
                  <Link to={sub.path} onClick={this.handleMenuClick}>
                    {sub.label}
                  </Link>
                </Menu.Item>
              ))}
            </Menu.SubMenu>
            :
            <Menu.Item key={i.id}>
              <Link to={i.path} onClick={this.handleMenuClick}>
                <span>{i.label}</span>
              </Link>
            </Menu.Item>))}
      </Menu>
    );
  }
}

export default MenusComponent; 
