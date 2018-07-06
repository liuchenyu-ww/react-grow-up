import { Layout } from 'antd';
import { enquireScreen } from 'enquire-js';
import { action, observable } from 'mobx';
import { observer } from 'mobx-react';
import * as React from 'react';
import { HashRouter as Router, RouteComponentProps, withRouter } from 'react-router-dom';
// import { RootStore } from '../../rootStore';
import MenusComponent from './Menus';
// import Drawer from '../../components/Drawer';
import RoutesComponent from './Routes';
// import requireAuth from './common/Auth';
// import styles from './style.less';

const { Header, Content } = Layout;

interface Iprops extends RouteComponentProps<any>, React.Props<any> {
  // rootStore: RootStore;
}

@observer
class AppComponent extends React.Component<Iprops, {}> {

  @observable isMobile: boolean = false;
  @observable drawerVisible: boolean = false;

  @action toggleDrawer = (open: boolean) => () => {
    this.drawerVisible = open;
  }

  componentDidMount() {
    enquireScreen((b: boolean) => {
      this.isMobile = !!b;
    });
  }

  render() {

    const headerStyle = !this.isMobile ? { height: '64px', lineHeight: '64px' } : { height: '48px', lineHeight: '48px' };

    return (
      <Layout>
        <Header style={{ padding: 0, background: '#fff', boxShadow: '0 2px 8px #f0f1f2', zIndex: 1, ...headerStyle }}>
          <MenusComponent
            pathname={this.props.location.pathname}
            style={{ ...headerStyle }}
          />
        </Header>
        <Content style={{ background: '#fff', padding: '24px' }}>
          <RoutesComponent />
        </Content>
      </Layout>
    );
  }
}

const WithRouterApp = withRouter(AppComponent);

const App = () => (
  <Router basename={process.env._URL}><WithRouterApp /></Router>
);

export default App;
