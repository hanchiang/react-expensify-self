import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { startLogout } from '../actions/auth';

export function Header(props) {
    return (
        <header className="header">            
            <div className="content-container">
                <div className="header-content">
                    <Link className="header-title" to="/dashboard">
                        <h1>Expensify</h1>
                    </Link>
                    <button className="button button-link" onClick={props.startLogout}>Logout</button>
                </div>
            </div>
        </header>
    );
}

const mapDispatchToProps = (dispatch) => ({
    startLogout: () => dispatch(startLogout())
});

export default connect(null, mapDispatchToProps)(Header);