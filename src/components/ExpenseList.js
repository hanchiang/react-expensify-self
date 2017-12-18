import React from 'react';
import { connect } from 'react-redux';

import ExpenseListItem from './ExpenseListItem';
import getVisibleExpenses from '../selectors/getVisibleExpenses';

function ExpenseList(props) {
  const { expenses } = props;

  return (
    <div>
      {
        expenses.map(expense =>
          <ExpenseListItem key={expense.id} expense={expense} />
        )
      }
    </div>
  )
}

const mapStateToProps = (state) => ({
  expenses: getVisibleExpenses(state.expenses, state.filters)
});

export default connect(mapStateToProps)(ExpenseList);