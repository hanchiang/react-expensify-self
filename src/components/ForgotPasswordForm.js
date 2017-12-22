import React from 'react';
import { Formik, Field, Form } from 'formik';
import { connect } from 'react-redux';
import Yup from 'yup';

function MyForm(props) {
  const { errors, isSubmitting, touched, setErrors, sendPasswordResetError } = props;
  const textFieldClass = touched.email && errors.email ? 'text-input error' : 'text-input';

  return (
    <Form className="forgot-form">
      <h1 className="forgot-form-title">Sign up</h1>

      {touched.email && errors.email && <p className="forgot-error">{errors.email}</p>}
      {sendPasswordResetError && <p className="forgot-error">{sendPasswordResetError}</p>}
      <Field className={textFieldClass} type="text" name="email" placeholder="Email" />

      <button className="button forgot-button"
        disabled={isSubmitting || errors.email} >
        Reset password
      </button>
    </Form>
  );
}

function ForgotPasswordForm(props) {
  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Email is not valid').required('Email is required')
  });
  const initialValues = {
    email: ''
  };
  const { sendPasswordResetError } = props;

  const onSubmit = (values, actions) => {
    const { setSubmitting, resetForm, setErrors } = actions;
    const { email } = values;
    console.log(email);
    props.onPasswordReset(email);
  }

  return (
    <div className="forgot-form-layout content-container">
      <Formik
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        initialValues={initialValues}
        render={props =>
          <MyForm {...props} sendPasswordResetError={sendPasswordResetError} />}
      />
    </div>
  );
}

const mapStateToProps = (state) => ({
  sendPasswordResetError: state.auth.sendPasswordResetError
});

export default connect(mapStateToProps)(ForgotPasswordForm);