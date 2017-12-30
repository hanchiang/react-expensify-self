import React from 'react';
import { connect } from 'react-redux';

import ExpenseForm from './ExpenseForm';
import { startEditExpense, startRemoveExpense } from '../actions/expenses';
import DeleteExpenseModal from './DeleteExpenseModal';

class EditExpensePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      shouldRemoveExpense: false
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onRemoveClick = this.onRemoveClick.bind(this);
    this.onModalClose = this.onModalClose.bind(this);
    this.onModalConfirm = this.onModalConfirm.bind(this);
  }
  onSubmit(expense) {
    console.log('submit!')
    this.props.onSubmit(expense);
    this.props.history.push('/dashboard');
  }

  onRemoveClick() {
    this.setState({ showModal: true });
  }

  onModalClose() {
    this.setState({ showModal: false });
  }

  onModalConfirm(shouldRemoveExpense) {
    this.setState({ shouldRemoveExpense, showModal: false });
    if (shouldRemoveExpense) {
      this.props.onRemove(this.props.expense.id);
      this.props.history.push('/dashboard');
    }
  }

  render() {
    const { expense } = this.props;
    return (
      <div id="edit-expense-page">
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header-title">Edit Expense</h1>
          </div>
        </div>

        <div className="content-container">
          <ExpenseForm expense={expense} onSubmit={this.onSubmit} isEdit={true} onRemove={this.onRemoveClick} />
        </div>

      {
        <DeleteExpenseModal showModal={this.state.showModal}
          onModalConfirm={this.onModalConfirm}
          onModalClose={this.onModalClose}
        />
      }
      </div>
    );
  }
  
}

const mapStateToProps = (state, props) => ({
  expense: state.expenses.find(expense => expense.id === props.match.params.id)
});

const mapDispatchToProps = (dispatch, props) => ({
  onSubmit: (expense) => dispatch(startEditExpense(props.match.params.id, expense)),
  onRemove: (id) => dispatch(startRemoveExpense(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);