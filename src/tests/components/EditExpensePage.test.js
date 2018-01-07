import React from 'react';
import { shallow } from 'enzyme';

import { EditExpensePage } from '../../components/EditExpensePage';

describe('EditExpensePage', () => {
  it('should render EditExpensePage', () => {
    const wrapper = shallow(<EditExpensePage />);
    expect(wrapper).toMatchSnapshot();
  });
});