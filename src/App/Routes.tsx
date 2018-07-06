import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import PrivateRoute from '../components/PrivateRoute';
import { getAsyncComponent } from './helper';

const RoutesComponent = () => (
  <Switch>
    <Route key="default" exact={true} path="/"><Redirect to={{ pathname: '/home' }} /></Route>
    <PrivateRoute key="home" path="/home" component={getAsyncComponent(() => import('../pages/Home/index.1'))} />
    <PrivateRoute key="echarts" path="/echarts" component={getAsyncComponent(() => import('../pages/Echarts/index'))} />
    <Route key="login" path="/login" component={getAsyncComponent(() => import('../pages/Login/index'))} />
    {/* <PrivateRoute key="welcome" path="/welcome" component={getAsyncComponent(() => import('../pages/Welcome/index'))} /> */}
    <Route key="not-found" path="*" component={getAsyncComponent(() => import('../pages/NotFound/index'))} />
  </Switch>
);

export default RoutesComponent; 
