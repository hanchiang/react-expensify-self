import React from 'react';

import { Formik, Field, Form } from 'formik';
import Yup from 'yup';

// Formik form logic
class MyForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleClickClose = this.handleClickClose.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { setSubmitting, setErrors, linkEmailAuthProviderError, shouldCloseLinkEmailModal } = nextProps;
    // async error from firebase
    // console.log(this.props.shouldCloseLinkEmailModal);
    // console.log(nextProps.shouldCloseLinkEmailModal);
    if (!this.props.linkEmailAuthProviderError && linkEmailAuthProviderError) {
      setErrors({email: linkEmailAuthProviderError});
      setSubmitting(false);
    }
    // Close modal 5 seconds after linking succeeds
    if (shouldCloseLinkEmailModal) {
      nextProps.closeModal();
    }
  }

  handleClickClose(event) {
    this.props.closeModal();
  }

  render() {
    const { errors, isSubmitting, setSubmitting, touched, linkEmailAuthProviderSuccess, values } = this.props;

    const emailClass = touched.email && errors.email ?
      'link-email-text-input error' : 'link-email-text-input';
    const nameClass = (name) => touched[name] && errors[name] ?
      'link-email-name-input error' : 'link-email-name-input';
    const passwordFieldClass = touched.password && errors.password ?
      'link-email-password error' : 'link-email-password';
    const passwordConfirmFieldClass = touched.confirmPassword && errors.confirmPassword
      ? 'link-email-password error' : 'link-email-password';

    const successMessage = `Account is successfully linked to ${values.email}!`;

    return (
      <Form className="link-email-form">
        <div className="link-email-header">
          <h1 className="link-email-title">Link account</h1>
        </div>

        {linkEmailAuthProviderSuccess &&
          <div className="link-email-success">
            <h3 className="link-email-success-title">Success!</h3>
            <p className="link-email-success-message">{successMessage}</p>
          </div>
        }

        <div className="link-email-names">
          <div className="link-email-name">
            <div className="link-email-name-error-wrap">
              {touched.firstName && errors.firstName && <p className="link-email-name-error">{errors.firstName}</p>}
            </div>
            <Field className={nameClass('firstName')} type="text" name="firstName" placeholder="First name" />
          </div>

          <div className="link-email-name">
            <div className="link-email-name-error-wrap">
              {touched.lastName && errors.lastName && <p className="link-email-name-error">{errors.lastName}</p>}
            </div>
            
            <Field className={nameClass('lastName')} type="text" name="lastName" placeholder="Last name" />
          </div>
        </div>

        {touched.email && errors.email && <p className="link-email-error">{errors.email}</p>}
        <Field className={emailClass} type="text" name="email" placeholder="Email" />

        {touched.password && errors.password && <p className="link-email-error">{errors.password}</p>}
        <Field className={passwordFieldClass} name="password" type="password" placeholder="Password" />

        {touched.confirmPassword && errors.confirmPassword && <p className="link-email-error">{errors.confirmPassword}</p>}
        <Field className={passwordConfirmFieldClass} name="confirmPassword" type="password" placeholder="Confirm password" />

        <div className="link-email-actions">
          <button onClick={this.handleClickClose} type="button" 
            className="button link-email-button link-email-button-close">
              Close
          </button>
          <button className="button link-email-button"
            disabled={isSubmitting || (errors.email || errors.password || errors.confirmPassword)} >
              Link
          </button>
        </div>
      </Form>
    );
  }
}

function LinkEmailForm(props) {
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
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

  const { closeModal, linkEmailAuthProviderError, 
    linkEmailAuthProviderSuccess, shouldCloseLinkEmailModal
  } = props;

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
      const user = {
        email: values.email, password: values.password,
        firstName: values.firstName, lastName: values.lastName
      };
      props.onSubmit(user);
    }
  }

  return (
    <Formik
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      initialValues={initialValues}
      render={props =>
        <MyForm {...props} 
          closeModal={closeModal}
          linkEmailAuthProviderError={linkEmailAuthProviderError}
          linkEmailAuthProviderSuccess={linkEmailAuthProviderSuccess}
          shouldCloseLinkEmailModal={shouldCloseLinkEmailModal}
      />}
    />
  );
}

export default LinkEmailForm;