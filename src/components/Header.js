import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { startLogout } from '../actions/auth';
import BurgerMenu from './BurgerMenu';

function Header(props) {
  const { displayName, photoURL } = props;
  return (
    <header className="header">
      <div className="content-container">
        <div className="header-content">
          <Link className="header-title" to="/dashboard">
            <h1>Expensify</h1>
          </Link>

          <div className="header-secondary">
            <div className="header-greetings">
              {photoURL && <img className="profile-pic" src={photoURL} alt="Profile picture" height="42" />}
              {displayName && <span className="show-for-desktop greeting-text">Hello {displayName}!</span>}
            </div>

            <button className="button button-link logout-button" onClick={props.startLogout}>Logout</button>
          </div>
        </div>
      </div>

      <BurgerMenu />
    </header>
  );
}


const mapStateToProps = (state) => {
  const signInProvider = state.auth.signInProvider;
  const providerDataLength = state.auth.user && state.auth.user.providerData.length;
  
  return providerDataLength > 0 ? {
    displayName: state.auth.user.providerData[providerDataLength - 1].displayName,
    photoURL: state.auth.user.providerData[providerDataLength - 1].photoURL
  } :
  {displayName: '', photoURL: ''}
};


const mapDispatchToProps = (dispatch) => ({
  startLogout: () => dispatch(startLogout())
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);