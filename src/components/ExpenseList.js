import React from 'react';
import { connect } from 'react-redux';

import ExpenseListItem from './ExpenseListItem';
import getVisibleExpenses from '../selectors/getVisibleExpenses';

function ExpenseList(props) {
  const { expenses } = props;

  return (
    <div>
      <div className="list-header">
        <div>Expenses</div>
        <div className="show-for-desktop">Amount</div>
      </div>

      <div className="list-body">
        {
          expenses.length === 0 ? <div className="list-item list-item-message">No expenses</div>
          :
          expenses.map(expense =>
            <ExpenseListItem key={expense.id} expense={expense} />
          )
        }
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  expenses: getVisibleExpenses(state.expenses, state.filters)
});

export default connect(mapStateToProps)(ExpenseList);