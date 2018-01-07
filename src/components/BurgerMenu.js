import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { startLogout } from '../actions/auth';

export class BurgerMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    };
  }

  isMenuOpen(state) {
    return state.isOpen;
  }

  render() {
    return (
      <Menu right isOpen={this.state.isOpen} onStateChange={this.isMenuOpen}>
          <Link to="/profile">Profile</Link>
          <button className="button button-link logout-button" type="button" onClick={this.props.startLogout}>Logout</button>
      </Menu>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  startLogout: () => dispatch(startLogout())
});

export default connect(null, mapDispatchToProps)(BurgerMenu);