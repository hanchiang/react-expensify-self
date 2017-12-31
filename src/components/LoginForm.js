import React from 'react';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();
    this.props.passwordLogin(this.state.email, this.state.password);
  }

  onEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  onPasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  render() {
    const { loginError } = this.props;
    const textInputClass = loginError ? 'login-text-input error' : 'login-text-input';

    return (
      <div className="login-form">
        <div className="login-form-providers">
          <button onClick={this.props.googleLogin} className="google-button" type="button">
            <img src="/images/google.png" alt="Google logo" width="45" />
          </button>

          <button onClick={this.props.facebookLogin} className="facebook-button" type="button">
            <img src="/images/facebook.png" alt="Facebook logo" width="80" />
          </button>
        </div>

        <div>
          <p className="or">OR</p>
        </div>

        <form className="form" onSubmit={this.onSubmit}>
          {loginError && <p className="login-error">{loginError}</p>}
          <input type="text" name="email" className={textInputClass} placeholder="Email"
            value={this.state.email} onChange={this.onEmailChange}
          />
          <input type="password" className="login-password" placeholder="Password"
            value={this.state.password} onChange={this.onPasswordChange}
          />
          <div className="login-button-layout">
            <button className="button login-button">Login</button>
          </div>
        </form>
      </div>
    );
  }
}

export default LoginForm;