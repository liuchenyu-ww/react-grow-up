import { Button, Checkbox, Form, Icon, Input, message } from 'antd';
import * as React from 'react';
import rootStore from '../../rootStore';
import { storage } from '../../utils/helper';
import logo from './logo.svg';
import styles from './style.module.less';

const FormItem = Form.Item;

interface IProps {
  history: { [key: string]: string | any };
}

interface IStates {
  username: string;
  password: string;
  remember: boolean;
}

// @observer
class LoginComponent extends React.Component<IProps, IStates> {

  // field is not touched at the beginning
  usernameFieldTouched = false;
  passwordFieldTouched = false;

  state = {
    password: '',
    remember: true,
    username: ''
  };

  handleInputChange = (id: 'username' | 'password' | 'remember') => (e: any) => {
    if (id === 'remember') {
      this.setState({ remember: e.target.checked });
      return;
    }

    if (!this[`${id}FieldTouched`]) {
      this[`${id}FieldTouched`] = true;
    }
    const updateObj = {};
    updateObj[id] = e.target.value
    this.setState(updateObj);
  }

  handleSubmit = (e: any) => {
    e.preventDefault();
    const { username, password, remember } = this.state;
    if (username.trim() === 'admin' && password === 'admin') {
      const credentials = JSON.stringify({
        access_token: 'test-token',
        user: { id: 1, username: username.trim() }
      });
      storage.setItem(remember ? 'local' : 'session', 'credentials', credentials);
      rootStore.setAuthed(true);
      this.props.history.push('/');
      return;
    }
    message.error('用户名或密码错误');
  }

  render() {
    const { usernameFieldTouched, passwordFieldTouched, state } = this;
    const { username, password, remember } = state;

    const usernameError = !username.trim() && usernameFieldTouched;
    const passwordError = !password && passwordFieldTouched;

    return (
      <div className={styles.container}>
        <div className={styles.top}>
          <img src={logo} className={styles.logo} alt="logo" />
          <span className={styles.title}>react sail</span>
        </div>
        <div className={styles.login}>
          <Form onSubmit={this.handleSubmit} className={styles.form}>
            <FormItem
              validateStatus={usernameError ? 'error' : 'success'}
              help={usernameError ? 'Please input your username!' : ''}
            >
              <Input
                id="username"
                value={username}
                onChange={this.handleInputChange('username')}
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="admin"
              />
            </FormItem>
            <FormItem
              validateStatus={passwordError ? 'error' : 'success'}
              help={passwordError ? 'Please input your password!' : ''}
            >
              <Input
                id="password"
                value={password}
                onChange={this.handleInputChange('password')}
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="admin"
              />
            </FormItem>
            <FormItem>
              <Checkbox
                checked={remember}
                onChange={this.handleInputChange('remember')}
              >
                Remember me
              </Checkbox>
              <a className={styles.forgot}>Forgot password</a>
            </FormItem>
            <FormItem>
              <Button
                disabled={!username.trim() || !password}
                type="primary"
                size="large"
                htmlType="submit"
                className={styles.btn}
              >
                Log in
              </Button>
            </FormItem>
          </Form>
        </div>
      </div>
    );
  }

}

export default LoginComponent;
