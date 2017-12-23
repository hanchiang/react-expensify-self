import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { auth } from '../firebase/firebase';

import { startLogout } from '../actions/auth';

export function Header(props) {
    const user = auth.currentUser;
    const { displayName, photoURL } = user;
    return (
        <header className="header">
            <div className="content-container">
                <div className="header-content">
                    <Link className="header-title" to="/dashboard">
                        <h1>Expensify</h1>
                    </Link>

                    <div className="header-secondary">

                        {displayName && photoURL &&
                            <div className="header-greetings">
                                <img className="profile-pic" src={photoURL} alt="Profile picture" height="42" />
                                <span className="show-for-desktop greeting-text">Hello {displayName}!</span>
                            </div>
                        }

                        <button className="button button-link logout-button" onClick={props.startLogout}>Logout</button>
                    </div>
                </div>
            </div>
        </header>
    );
}

const mapDispatchToProps = (dispatch) => ({
    startLogout: () => dispatch(startLogout())
});

export default connect(null, mapDispatchToProps)(Header);