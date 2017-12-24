import React from 'react';
import { connect } from 'react-redux';

import { startLogin } from '../actions/auth';
import LoginForm from './LoginForm';

function LoginPage(props) {
  return (
    <LoginForm
      passwordLogin={props.passwordLogin}
      googleLogin={props.googleLogin}
      loginError={props.loginError}
    />
  );
}

const mapStateToProps = (state) => ({
  loginError: state.auth.loginError
});

const mapDispatchToProps = (dispatch) => ({
  googleLogin: () => dispatch(startLogin({ type: 'google' })),
  passwordLogin: (email, password) => dispatch(startLogin({ type: 'password', email, password }))
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);