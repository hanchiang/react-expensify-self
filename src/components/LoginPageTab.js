import React from 'react';
import { connect } from 'react-redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Link } from 'react-router-dom';

import LoginPage from './LoginPage';
import SignUpPage from './SignUpPage';

function LoginPageTab(props) {
  return (
    <div className="box-layout">
      <div className="box-layout-box">
        <h1 className="box-layout-title">Expensify</h1>
        <Tabs>
          <TabList>
            <Tab>Login</Tab>
            <Tab>Signup</Tab>
          </TabList>

          {/* Login tab */}
          <TabPanel>
            <LoginPage />
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
      </div>
    </div>
  );
}

export default LoginPageTab;