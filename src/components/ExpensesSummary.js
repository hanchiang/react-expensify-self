import React from 'react';
import numeral from 'numeral';
import { connect } from 'react-redux';

import getVisibleExpenses from '../selectors/getVisibleExpenses';
import getExpensesTotal from '../selectors/getExpensesTotal';
import { setStartDate, setEndDate } from '../actions/filters';

function ExpensesSummary(props) {
  const { expensesTotal, expensesCount, hiddenExpensesCount } = props;
  const getExpenseWord = (count) => count <= 1 ? 'expense' : 'expenses';
  const formattedAmount = numeral(expensesTotal/100).format('$0,0.00');

  const onClick = (event) => props.showAllExpenses();

  return (
    <div>
      <h1 className="page-header-title">
        Viewing <span>{expensesCount}</span> {getExpenseWord(expensesCount)} totalling <span>{formattedAmount}</span>
      </h1>
      {
        hiddenExpensesCount > 0 ? 
        <p className="page-header-subtitle">Not showing <span>{hiddenExpensesCount}</span>
          &nbsp;{getExpenseWord(hiddenExpensesCount)} due to filters
          (click <button onClick={onClick} className="button button-link-filters">here</button> to show all)
        </p>
        : null
      }      
    </div>
  );
}

const mapStateToProps = (state) => {
  const expenses = getVisibleExpenses(state.expenses, state.filters);
  return {
    hiddenExpensesCount: state.expenses.length - expenses.length,
    expensesCount: expenses.length,
    expensesTotal: getExpensesTotal(expenses)
  }
};

const mapDispatchToProps = (dispatch) => ({
  showAllExpenses: () => {
    dispatch(setStartDate(null));
    dispatch(setEndDate(null));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesSummary);