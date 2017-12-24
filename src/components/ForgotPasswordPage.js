import React from 'react';
import { connect } from 'react-redux';

import ForgotPasswordForm from './ForgotPasswordForm';
import { startSendPasswordReset, setSendPasswordResetError } from '../actions/auth';

function ForgotPasswordPage(props) {
  const sendPasswordReset = (email) => {
    props.sendPasswordReset(email);
    props.setSendPasswordResetError('');
  };

  return (
    <div>
      <ForgotPasswordForm onPasswordReset={sendPasswordReset}
        sendPasswordResetError={props.sendPasswordResetError}
        sendPasswordResetSuccess={props.sendPasswordResetSuccess}
      />
    </div>
  );
}

const mapStateToProps = (state) => ({
  sendPasswordResetError: state.auth.sendPasswordResetError,
  sendPasswordResetSuccess: state.auth.sendPasswordResetSuccess
});

const mapDispatchToProps = (dispatch) => ({
  sendPasswordReset: (email) => dispatch(startSendPasswordReset(email)),
  setSendPasswordResetError: (error) => dispatch(setSendPasswordResetError(error))
});

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordPage);