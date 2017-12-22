import React from 'react';
import { connect } from 'react-redux';

import SignUpForm from './SignUpForm';
import { createUser } from '../actions/auth';

function SignUpPage(props) {
  return (
    <div>
      <SignUpForm onSubmit={createUser} />
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  createUser: (email, password) => dispatch(createUser(email, password))
});

export default connect(null, mapDispatchToProps)(SignUpPage);