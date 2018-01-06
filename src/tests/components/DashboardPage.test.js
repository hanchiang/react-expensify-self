import React from 'react';
import { shallow } from 'enzyme';

import DashboardPage from '../../components/ExpenseDashboardPage';

test('should render DashboardPage', () => {
    const wrapper = shallow(<DashboardPage />);
    expect(wrapper).toMatchSnapshot();
});