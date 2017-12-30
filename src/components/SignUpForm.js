import React from 'react';

import { Formik, Field, Form } from 'formik';
import Yup from 'yup';

// Formik form logic
class MyForm extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
    const { createUserError, setSubmitting, setErrors } = nextProps;
    // async error from firebase
    if (!this.props.createUserError && createUserError) {
      setSubmitting(false);
      setErrors({email: createUserError});
    }
  }

  render() {
    const { errors, isSubmitting, setSubmitting, touched } = this.props;
    const textFieldClass = touched.email && errors.email ?
      'signup-text-input error' : 'signup-text-input';
    const passwordFieldClass = touched.password && errors.password ?
      'signup-password error' : 'signup-password';
    const passwordConfirmFieldClass = touched.confirmPassword && errors.confirmPassword
      ? 'signup-password error' : 'signup-password';    

    return (
      <Form className="signup-form">
        <div className="signup-names">
          <Field className="signup-text-input" type="text" name="firstName" placeholder="First name" />
          <Field className="signup-text-input" type="text" name="lastName" placeholder="Last name" />
        </div>
        
        {touched.email && errors.email && <p className="signup-error">{errors.email}</p>}
        {/* {createUserError && <p className="signup-error">{createUserError}</p>} */}
        <Field className={textFieldClass} type="text" name="email" placeholder="Email" />

        {touched.password && errors.password && <p className="signup-error">{errors.password}</p>}
        <Field className={passwordFieldClass} name="password" type="password" placeholder="Password" />

        {touched.confirmPassword && errors.confirmPassword && <p className="signup-error">{errors.confirmPassword}</p>}
        <Field className={passwordConfirmFieldClass} name="confirmPassword" type="password" placeholder="Confirm password" />
        <button className="button signup-button"
          disabled={isSubmitting || (errors.email || errors.password || errors.confirmPassword)} >
          Register
        </button>
      </Form>
    );
  }
}

function SignUpForm(props) {
  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Email is not valid').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confirmPassword: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required')
  });
  const initialValues = {
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: ''
  };
  const { createUserError } = props;

  const onSubmit = (values, actions) => {
    const { setSubmitting, resetForm, setErrors } = actions;
    const { email, password, confirmPassword } = values;

    if (password !== confirmPassword) {
      setErrors({
        password: 'Passwords do not match',
        confirmPassword: 'Passwords do not match'
      });
      setSubmitting(false);
    } else {
      props.onSubmit(values);
    }
  }

  return (
    <Formik
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      initialValues={initialValues}
      render={props => 
        <MyForm {...props} createUserError={createUserError} />}
    />
  );
}

export default SignUpForm;