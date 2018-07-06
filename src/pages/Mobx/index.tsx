import { Button } from 'antd';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import * as React from 'react';
import fetchUser from './api';
import { actions, states } from './store/index';
import styles from './style.module.less';

interface IUser {
  id: string | number;
  name: string;
}

// const App: React.SFC<Iprops> = observer((Iprops) 
@observer
class HomeComponent extends React.Component<{}, {}> {

  @observable user: IUser;

  queryUser = async () => {
    actions.home.changeTitle();
    this.user = await fetchUser.query();
  }

  render() {
    // console.log(states);
    // console.log(store.home.title);
    // console.log(actions);
    const name = this.user && this.user.name || 'no user';

    return (
      <div>
        <h1 className={styles.title}>{name}</h1>
        <h1 className={styles.title}>{states.home.title}</h1>
        <Button type="primary" onClick={this.queryUser}>获取user</Button>
      </div>
    );
  }

}

export default HomeComponent; 
