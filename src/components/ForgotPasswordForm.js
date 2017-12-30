import React from 'react';
import { Formik, Field, Form } from 'formik';
import Yup from 'yup';

class MyForm extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
    const { 
      sendPasswordResetError, sendPasswordResetSuccess, 
      setErrors, setSubmitting, values, setStatus 
    } = nextProps;
    
    // console.log(nextProps.values);
    if (!this.props.sendPasswordResetError && sendPasswordResetError) {
      // async error from firebase
      setErrors({ email: sendPasswordResetError});
      setSubmitting(false);
    } else {
      // setvalues({ sendPasswordResetSuccess: successMessage});
    }
  }

  render() {
    const { errors, isSubmitting, touched, sendPasswordResetSuccess } = this.props;
    const textFieldClass = touched.email && errors.email ? 'forgot-text-input error' : 'forgot-text-input';
    const successMessage = 'Instructions to reset your password has been sent to your email. Redirecting to login...'

    return (
      <Form className="forgot-form">
        <h1 className="forgot-form-title">Reset password</h1>

        {touched.email && errors.email && <p className="forgot-error">{errors.email}</p>}

        {sendPasswordResetSuccess &&
          <div className="reset-success">
            <h3 className="reset-success-title">Success!</h3>
            <p className="reset-success-message">{successMessage}</p>
          </div>
        }
          
        <Field className={textFieldClass} type="text" name="email" placeholder="Email" />

        <button className="button reset-password-button"
          disabled={isSubmitting || errors.email} >
          Reset password
      </button>
      </Form>
    );
  }
  
}

function ForgotPasswordForm(props) {
  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Email is not valid').required('Email is required')
  });
  const initialValues = {
    email: '',
    sendPasswordResetSuccess: ''
  };
  const { sendPasswordResetError, sendPasswordResetSuccess } = props;

  const onSubmit = (values, actions) => {
    const { setSubmitting, resetForm, setErrors } = actions;
    const { email } = values;
    props.onPasswordReset(email);
  }

  return (
    <div className="forgot-form-layout content-container">
      <Formik
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        initialValues={initialValues}
        render={props =>
          <MyForm {...props} 
            sendPasswordResetError={sendPasswordResetError}
            sendPasswordResetSuccess={sendPasswordResetSuccess}
          />}
      />
    </div>
  );
}

export default ForgotPasswordForm;