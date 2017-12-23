import React from 'react';
import { connect } from 'react-redux';

import SignUpForm from './SignUpForm';
import { createUser } from '../actions/auth';

function SignUpPage(props) {
  return (
    <SignUpForm createUserError={props.createUserError} onSubmit={props.createUser} />
  );
}

const mapStateToProps = (state) => ({
  createUserError: state.auth.createUserError
});

const mapDispatchToProps = (dispatch) => ({
  createUser: (email, password) => dispatch(createUser(email, password))
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUpPage);