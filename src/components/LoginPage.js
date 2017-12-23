import React from 'react';
import { connect } from 'react-redux';

import { startLogin } from '../actions/auth';
import LoginPageForm from './LoginPageForm';

function LoginPage(props) {
  
  return (
    <div className="box-layout">
      <div className="box-layout-box">
        <h1 className="box-layout-title">Expensify</h1>
        
        <LoginPageForm 
          passwordLogin={props.passwordLogin}
          googleLogin={props.googleLogin}
          loginError={props.loginError}
        />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  loginError: state.auth.loginError
});

const mapDispatchToProps = (dispatch) => ({
  googleLogin: () => dispatch(startLogin({type: 'google'})),
  passwordLogin: (email, password) => dispatch(startLogin({type: 'password', email, password}))
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);