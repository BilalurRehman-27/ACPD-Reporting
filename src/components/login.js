import React from 'react';
import { Redirect } from 'react-router-dom';
import { Form, Button } from 'antd';
import Modal from './modal';
import '../login.css';
import { apiCall } from '../Services/API'

class LoginForm extends React.Component {
  constructor() {
    super();
    this.state = {
      isValidLogin: false,
      isLoading: false,
      error: '',
      username: 'ReportDataTester',
      password: 'Password1990',
      visible: false,
      errorMessage: ''
    };
  }

  handleLogin = () => {
    this.setState({ isLoading: true });
    const { username, password } = this.state;

    apiCall.GetLoginToken(username, password).then((result) => {
      localStorage.setItem('Access_Token', result.data.access_token);
      this.setState({
        isValidLogin: true,
        error: '',
        isLoading: false,
        errorMessage: '',
        visible: false,
      })
    }).catch((err) => {
      this.setState({
        isValidLogin: false,
        isLoading: false,
        errorMessage: err.response.data.error_description,
        error: err.response.statusText,
        visible: true,
      })
    })
  };

  handleUserChange = event => {
    this.setState({ username: event.target.value, error: '' });
  };
  handlePasswordChange = event => {
    this.setState({ password: event.target.value, error: '' });
  };
  setModalStatus = status => {
    this.setState({
      visible: status
    });
  };

  render() {
    const { isValidLogin, error, visible, isLoading, errorMessage, username, password } = this.state;
    if (isValidLogin) {
      return <Redirect to='/dashboard' />;
    }
    return (
      <div>
        {error && (
          <Modal
            getModalStatus={this.setModalStatus}
            visible={visible}
            message={errorMessage}
            title={error}
          />
        )}

        <div
          className='centerall'
          style={{
            backgroundImage: `url(${require('../images/background.png')})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <div className='login-block'>
            <h1>Login</h1>
            <input
              type='text'
              text={username}
              id='username'
              onChange={this.handleUserChange}
            />
            <input
              type='password'
              text={password}
              id='password'
              onChange={this.handlePasswordChange}
            />
            <Button
              type='primary'
              loading={isLoading}
              onClick={this.handleLogin}
            >
              Login
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

const WrappedLoginForm = Form.create({ name: 'normal_login' })(LoginForm);
export default WrappedLoginForm;
