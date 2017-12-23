import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Link } from 'react-router-dom';

import SignUpPage from './SignUpPage';

class LoginPageForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();
    this.props.passwordLogin(this.state.email, this.state.password);
  }

  onEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  onPasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  render() {
    const { loginError } = this.props;
    return (
      <div>
        <Tabs>
          <TabList>
            <Tab>Login</Tab>
            <Tab>Signup</Tab>
          </TabList>

          {/* Login tab */}
          <TabPanel>
            <div className="google-login-layout">
              <button className="button google-button" onClick={this.props.googleLogin}>Login with google</button>
              <p>OR</p>
            </div>

            <form className="form login-form" onSubmit={this.onSubmit}>
              { loginError && <p className="login-error">{loginError}</p> }
              <input type="text" className="login-text-input" placeholder="Email" value={this.state.email} onChange={this.onEmailChange} />
              <input type="password" className="login-password" placeholder="Password" value={this.state.password} onChange={this.onPasswordChange} />
              <div className="login-button-layout">
                <button className="button login-button">Login</button>
              </div>
            </form>
          </TabPanel>

          {/* Sign up tab */}
          <TabPanel>
            <SignUpPage />
          </TabPanel>
        </Tabs>

        <div className="forgot-password-layout">
          <p>Forgot your password?</p>
          <p>Click <Link to="/forgot">here</Link> to get a new one</p>
        </div>
        
        {/* 
        
        */}
      </div>
    );
  }
  
}

export default LoginPageForm;