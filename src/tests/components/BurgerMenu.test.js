import React from 'react';
import { shallow } from 'enzyme';

import { BurgerMenu } from '../../components/BurgerMenu';

describe('BurgerMenu', () => {
  it('should render BurgerMenu', () => {
    const wrapper = shallow(<BurgerMenu />);
    expect(wrapper).toMatchSnapshot();
  });
})