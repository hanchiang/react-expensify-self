import React from 'react';
import numeral from 'numeral';
import { connect } from 'react-redux';

import getVisibleExpenses from '../selectors/getVisibleExpenses';
import getExpensesTotal from '../selectors/getExpensesTotal';

function ExpensesSummary(props) {
  const { expensesTotal, expensesCount } = props;
  const expenseWord = expensesCount <= 1 ? 'expense' : 'expenses';
  const formattedAmount = numeral(expensesTotal/100).format('$0,0.00');

  return (
    <div>
      <h1 className="page-header-title">Viewing <span>{expensesCount}</span> {expenseWord} totalling <span>{formattedAmount}</span></h1>
    </div>
  );
}

const mapStateToProps = (state) => {
  const expenses = getVisibleExpenses(state.expenses, state.filters);
  return {
    expensesCount: expenses.length,
    expensesTotal: getExpensesTotal(expenses)
  }
};

export default connect(mapStateToProps)(ExpensesSummary);