import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { startLogin } from '../actions/auth';

class LoginPage extends React.Component {
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
    this.setState({email: event.target.value});
  }

  onPasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  render() {
    return (
      <div className="box-layout">
        <div className="box-layout-box">
          <h1 className="box-layout-title">Expensify</h1>
          <p>Get your expenses under control now</p>
          <button className="button" onClick={this.props.googleLogin}>Login with google</button>
          
          <Link to="/signup"><button>Sign up</button></Link>
          <p>Forgot your password?</p>
          <p>Click <Link to="/forgot">here</Link> to reset it</p>
          
          <form onSubmit={this.onSubmit}>
            <input type="text" placeholder="Email" value={this.state.email} onChange={this.onEmailChange} />
            <input type="password" placeholder="Password" value={this.state.password} onChange={this.onPasswordChange} />
            <button>Login</button>
          </form>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  googleLogin: () => dispatch(startLogin({type: 'google'})),
  passwordLogin: (email, password) => dispatch(startLogin({type: 'password', email, password}))
});

export default connect(null, mapDispatchToProps)(LoginPage);