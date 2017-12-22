import React from 'react';
import { connect } from 'react-redux';

import ForgotPasswordForm from './ForgotPasswordForm';
import { sendPasswordReset } from '../actions/auth';

function ForgotPasswordPage(props) {
  return (
    <div>
      <ForgotPasswordForm onPasswordReset={props.sendPasswordReset} />
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  sendPasswordReset: (email) => dispatch(sendPasswordReset(email))
});

export default connect(null, mapDispatchToProps)(ForgotPasswordPage);