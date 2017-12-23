import React from 'react';
import { Formik, Field, Form } from 'formik';
import Yup from 'yup';

class MyForm extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
    const { sendPasswordResetError, setErrors, setSubmitting } = nextProps;
    if (this.props.sendPasswordResetError === undefined && sendPasswordResetError) {
      setErrors({ email: sendPasswordResetError});
      setSubmitting(false);
    }
  }

  render() {
    const { errors, isSubmitting, touched } = this.props;
    const textFieldClass = touched.email && errors.email ? 'forgot-text-input error' : 'forgot-text-input';

    return (
      <Form className="forgot-form">
        <h1 className="forgot-form-title">Reset password</h1>

        {touched.email && errors.email && <p className="forgot-error">{errors.email}</p>}
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
    email: ''
  };
  const { sendPasswordResetError } = props;

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
          <MyForm {...props} sendPasswordResetError={sendPasswordResetError} />}
      />
    </div>
  );
}

export default ForgotPasswordForm;