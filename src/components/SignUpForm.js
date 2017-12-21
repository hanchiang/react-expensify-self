import React from 'react';
import validator from 'validator';

// Client sided validation: Using second method
// First: Check for errors when form is submitted, and display error
// Second: Disable submit button, can continuous validate error as user fills up the form
//         Enable submit button when inputs are valid


class SignUpForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isEmailValid: false,
      isPasswordValid: false,
      error: '',
      email: '',
      password: '',
      confirmPassword: '',
      isSubmitting: false,
    };
  }

  validatePassword = (password1, password2) => 
    (password1 !== '' && password2 !== '') && (password1 === password2);

  onEmailChange = (event) => {
    const email = event.target.value;
    if (validator.isEmail(email)) {
      this.setState({email, isEmailValid: true});
    } else {
      this.setState({ email, isEmailValid: false });
    }
  }
   
  onPasswordChange = (event) => {
    const password = event.target.value;
    if (this.validatePassword(password, this.state.confirmPassword)) {
      this.setState({password, isPasswordValid: true});
    } else {
      this.setState({password, isPasswordValid: false});
    }
    
  }
  onConfirmPasswordChange = (event) => {
    const confirmPassword = event.target.value;
    if (this.validatePassword(confirmPassword, this.state.password)) {
      this.setState({ confirmPassword, isPasswordValid: true });
    } else {
      this.setState({ confirmPassword, isPasswordValid: false });
    }
  }

  onSubmit = (event) => {
    event.preventDefault();
    this.setState({ isSubmitting: true});
    this.props.onSubmit(this.state.email, this.state.password);
    /*
    let error = [];
    if (this.state.email === '') {
      error.push('Please enter email');
    } else if (!validator.isEmail(this.state.email)) {
      error.push('Email is invalid');
    }
    if (this.state.password === '' || this.state.password === '') {
      error.push('Please enter the passwords');
    }
    else if (this.state.password !== this.state.confirmPassword) {
      error.push('Passwords do not match');
    }
    if (error.length === 0) {
      error = '';
      this.props.onSubmit(this.state.email, this.state.password);
    }
    this.setState({error});
    */
  }

  render() {
    const error = this.state.error;

    return (
      <div className="signup-form-layout content-container">
        <form className="signup-form" onSubmit={this.onSubmit} >
          <h1 className="signup-form-title">Sign up</h1>

          { error && error.map(err => <p className="signup-form-error">{err}</p>) }

          <input className="text-input" value={this.email} onChange={this.onEmailChange} 
            type="text" placeholder="Email"/>
          <input className="password" value={this.password} onChange={this.onPasswordChange} 
            type="password" placeholder="Password (at least 6 characters)" />
          <input className="password" value={this.confirmPassword} onChange={this.onConfirmPasswordChange}
            type="password" placeholder="Confirm password (at least 6 characters)" />
          <button className="button signup-button" disabled={!this.state.isEmailValid || !this.state.isPasswordValid} >Register</button>
          {/* this.state.isSubmitting ?
            <button className="button signup-button" disabled={!this.state.isEmailValid || !this.state.isPasswordValid} >
              <i className="fa fa-spinner fa-pulse fa-2x fa-fw"></i>
            </button>
            :
            <button className="button signup-button" disabled={!this.state.isEmailValid || !this.state.isPasswordValid} >Register</button>
          */}
        </form>
      </div>

    );
  }
}

export default SignUpForm;