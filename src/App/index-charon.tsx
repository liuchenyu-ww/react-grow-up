import { Avatar, Icon, Layout, Menu } from 'antd';
import * as React from 'react';
import { HashRouter as Router, Link, RouteComponentProps, withRouter } from 'react-router-dom';
import rootStore from '../rootStore';
import { getCredentials, storage } from '../utils/helper';
import { getDefaultOpen, getDefaultSelected, menus } from './helper';
import styles from './index-charon.module.less';
import RoutesComponent from './Routes';

const { Header, Sider, Content } = Layout;

interface IProps extends RouteComponentProps<any>, React.Props<any> {
  // rootStore: RootStore;
}

interface IState {
  collapsed: boolean;
}

class AppComponent extends React.Component<IProps, IState> {

  state = {
    collapsed: false
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  handleLogout = () => {
    storage.removeItem('credentials');
    rootStore.setAuthed(false);
  }

  render() {

    const { location } = this.props;
    const defaultSelected = getDefaultSelected(location);
    const defaultOpen = getDefaultOpen(defaultSelected, menus);

    const loggedInUser = getCredentials('user');

    return defaultSelected !== '/login' ?
      (
        <Layout>
          <Sider
            trigger={null}
            collapsible={true}
            collapsed={this.state.collapsed}
            style={{ height: '100vh' }}
            width={256}
          >
            <div className={styles.logo} />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={[defaultSelected]} defaultOpenKeys={[defaultOpen]}>
              {menus.map(i => (
                i.sub ?
                  <Menu.SubMenu
                    key={i.id}
                    title={<span><Icon type={i.icon} /><span>{i.label}</span></span>}
                  >
                    {i.sub.map(sub => (
                      <Menu.Item key={sub.id}>
                        <Link to={sub.path}>
                          {sub.label}
                        </Link>
                      </Menu.Item>
                    ))}
                  </Menu.SubMenu>
                  :
                  <Menu.Item key={i.id}>
                    <Link to={i.path}>
                      <Icon type={i.icon} />
                      <span>{i.label}</span>
                    </Link>
                  </Menu.Item>))}
            </Menu>
          </Sider>
          <Layout style={{ height: '100vh', overflow: 'auto' }}>
            <Header className={styles.header}>
              <Icon
                className={styles.icon}
                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.toggle}
              />
              <div className={styles.right}>
                <Menu mode="horizontal" selectedKeys={['']}>
                  <Menu.Item key={0}><a target="_blank" href="https://github.com/vdfor/react-sail"><Icon className={styles.icon} type={'github'} /></a></Menu.Item>
                  <Menu.SubMenu
                    key={1}
                    style={{ lineHeight: '64px' }}
                    title={[
                      <Avatar key={1.1} style={{ background: '#f56a00' }}>
                        {loggedInUser && loggedInUser.username ? loggedInUser.username.substring(0, 1).toUpperCase() : ''}
                      </Avatar>,
                      <span key={1.2} style={{ paddingLeft: '5px' }}>{loggedInUser && loggedInUser.username || ''}</span>
                    ]}
                  >
                    <Menu.Item key={2}>个人中心</Menu.Item>
                    <Menu.Divider />
                    <Menu.Item key={3} onClick={this.handleLogout}>
                      退出登录
                    </Menu.Item>
                  </Menu.SubMenu>
                </Menu>
              </div>
            </Header>
            <Content style={{ margin: '24px 16px 0' }}>
              <RoutesComponent />
            </Content>
          </Layout>
        </Layout >
      ) : <Layout><RoutesComponent /></Layout>;
  }
}

const WithRouterApp = withRouter(AppComponent);

const App = () => (
  <Router basename={process.env._URL}><WithRouterApp /></Router>
);

export default App;
