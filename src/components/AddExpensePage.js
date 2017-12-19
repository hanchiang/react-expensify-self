import React from 'react';
import { connect } from 'react-redux';

import ExpenseForm from './ExpenseForm';
import { startAddExpense } from '../actions/expenses';
import moment from 'moment';

function AddExpensePage(props) {
  const onSubmit = (expense) => {
    props.onSubmit(expense);
    props.history.push('/dashboard');
  }

  return (
    <div>
      <div className="page-header">
        <div className="content-container">
          <h1>Add Expense</h1>
        </div>
      </div>
      
      <div className="content-container">
        <ExpenseForm onSubmit={onSubmit} />
      </div>
      
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (expense) => dispatch(startAddExpense(expense))
});

export default connect(null, mapDispatchToProps)(AddExpensePage);