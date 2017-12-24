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
      <form className="login-form" onSubmit={this.onSubmit}>
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
    );
  }
}

export default LoginForm;