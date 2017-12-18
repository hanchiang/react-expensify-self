import React from 'react';

function ExpenseListItem(props) {
  const { expense } = props;
  return (
    <div>
      <div>id: {expense.id} description: {expense.description} amount: {expense.amount} createdAt: {expense.createdAt}</div>
    </div>
  );
}

export default ExpenseListItem;