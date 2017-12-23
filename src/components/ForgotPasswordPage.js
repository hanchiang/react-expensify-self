import React from 'react';
import { connect } from 'react-redux';

import ForgotPasswordForm from './ForgotPasswordForm';
import { sendPasswordReset } from '../actions/auth';

function ForgotPasswordPage(props) {
  return (
    <div>
      <ForgotPasswordForm onPasswordReset={props.sendPasswordReset}
        sendPasswordResetError={props.sendPasswordResetError}
      />
    </div>
  );
}

const mapStateToProps = (state) => ({
  sendPasswordResetError: state.auth.sendPasswordResetError
});

const mapDispatchToProps = (dispatch) => ({
  sendPasswordReset: (email) => dispatch(sendPasswordReset(email))
});

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordPage);