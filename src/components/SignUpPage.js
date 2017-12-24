import React from 'react';
import { connect } from 'react-redux';

import SignUpForm from './SignUpForm';
import { startCreateUser, setCreateUserError } from '../actions/auth';

function SignUpPage(props) {
  const createUser = (user) => {
    props.createUser(user);
    props.setCreateUserError('');
  }
  return (
    <SignUpForm createUserError={props.createUserError} onSubmit={createUser} />
  );
}

const mapStateToProps = (state) => ({
  createUserError: state.auth.createUserError
});

const mapDispatchToProps = (dispatch) => ({
  createUser: (user) => dispatch(startCreateUser(user)),
  setCreateUserError: (error) => dispatch(setCreateUserError(error))
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUpPage);