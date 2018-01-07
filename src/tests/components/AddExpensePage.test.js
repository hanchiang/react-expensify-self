import React from 'react';
import { shallow } from 'enzyme';

import { AddExpensePage } from '../../components/AddExpensePage';
import expenses from '../fixtures/expenses';

describe('AddExpensePage', () => {
  it('should render AddExpensePage', () => {
    const wrapper = shallow(<AddExpensePage />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should trigger onSubmit correctly', () => {
    const onSubmit = jest.fn();
    const history = {push: jest.fn()};
    const wrapper = shallow(<AddExpensePage onSubmit={onSubmit} history={history} />);
    // console.log(wrapper.find('ExpenseForm').prop('onSubmit'))
    wrapper.find('ExpenseForm').prop('onSubmit')(expenses[0]);
    expect(onSubmit).toHaveBeenCalledWith(expenses[0]);
    expect(history.push).toHaveBeenCalledWith('/dashboard');
  });
});
