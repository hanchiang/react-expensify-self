import React from 'react';
import { connect } from 'react-redux';

import { startLogin } from '../actions/auth';

export class LoginPage extends React.Component {
  render() {
    return (
      <div className="box-layout">
        <div className="box-layout__box">
          <h1 className="box-layout__title">Boilerplate</h1>
          <p>Tagline for app</p>
          <button className="button" onClick={this.props.startLogin}>Login with google</button>
        </div>
        
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  startLogin: () => dispatch(startLogin())
});

export default connect(null, mapDispatchToProps)(LoginPage);