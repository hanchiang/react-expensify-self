import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { auth, googleAuthProvider } from '../firebase/firebase';

import { startLogout, startLinkAuthProvider } from '../actions/auth';

export function Header(props) {
  const { displayName, photoURL } = props;

  const onGoogleLink = (event) => props.startLinkAuthProvider(googleAuthProvider);

  return (
    <header className="header">
      <div className="content-container">
        <div className="header-content">
          <Link className="header-title" to="/dashboard">
            <h1>Expensify</h1>
          </Link>

          <div className="header-secondary">
            <div className="link-account">
              <button onClick={onGoogleLink} type="button" className="button">Link with Google</button>
            </div>

            <div className="header-greetings">
              {photoURL && <img className="profile-pic" src={photoURL} alt="Profile picture" height="42" />}
              {displayName && <span className="show-for-desktop greeting-text">Hello {displayName}!</span>}
            </div>

            <button className="button button-link logout-button" onClick={props.startLogout}>Logout</button>
          </div>
        </div>
      </div>
    </header>
  );
}

const mapStateToProps = (state) => ({
  displayName: state.auth.user && state.auth.user.displayName,
  photoURL: state.auth.user && state.auth.user.photoURL,
  state
});

const mapDispatchToProps = (dispatch) => ({
  startLogout: () => dispatch(startLogout()),
  startLinkAuthProvider: (payload) => dispatch(startLinkAuthProvider(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);