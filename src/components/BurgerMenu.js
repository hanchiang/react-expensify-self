import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import { Link } from 'react-router-dom';

class BurgerMenu extends React.Component {
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
      </Menu>
    );
  }
}

export default BurgerMenu;