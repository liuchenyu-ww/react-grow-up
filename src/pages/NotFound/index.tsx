import { Button } from 'antd';
import { observer } from 'mobx-react';
import * as React from 'react';
import store from './store';

const NotFound = observer(() => (
  <div>
    <h1>{store.title}</h1>
    <Button type="primary" onClick={store.changeTitle}>change</Button>
  </div>
));

export default NotFound;
