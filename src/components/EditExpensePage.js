import React from 'react';
import { connect } from 'react-redux';

import ExpenseForm from './ExpenseForm';
import { startEditExpense, startRemoveExpense } from '../actions/expenses';

function EditExpensePage(props) {
  const { expense } = props;

  const onSubmit = (expense) => {
    props.onSubmit(expense);
    props.history.push('/dashboard');
  };

  const onRemove = (id) => {
    props.onRemove(expense.id);
    props.history.push('/dashboard');
  }

  return (
    <div>
      <div className="page-header">
        <div className="content-container">
          <h1 className="page-header-title">Edit Expense</h1>
        </div>
      </div>
      
      <div className="content-container">
          <ExpenseForm expense={expense} onSubmit={onSubmit} isEdit={true} onRemove={onRemove} />
      </div>
      
    </div>
  );
}

const mapStateToProps = (state, props) => ({
  expense: state.expenses.find(expense => expense.id === props.match.params.id)
});

const mapDispatchToProps = (dispatch, props) => ({
  onSubmit: (expense) => dispatch(startEditExpense(props.match.params.id, expense)),
  onRemove: (id) => dispatch(startRemoveExpense(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);