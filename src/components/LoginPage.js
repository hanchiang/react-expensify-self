import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { startLogin } from '../actions/auth';

export class LoginPage extends React.Component {
  render() {
    return (
      <div className="box-layout">
        <div className="box-layout-box">
          <h1 className="box-layout-title">Expensify</h1>
          <p>Get your expenses under control now</p>
          <button className="button" onClick={this.props.startLogin}>Login with google</button>
          {/*
          <Link to="/signup"><button>Sign up</button></Link>
          <p>Forgot your password?</p>
          <p>Click <Link to="/forgot">here</Link> to reset it</p>
          */}
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  startLogin: () => dispatch(startLogin())
});

export default connect(null, mapDispatchToProps)(LoginPage);