import React from 'react';
import moment from 'moment';
import numeral from 'numeral';
import { Link } from 'react-router-dom';

function ExpenseListItem(props) {
  const { expense } = props;
  const formattedAmount = numeral(expense.amount/100).format('$0,0.00');
  return (
    <Link to={`/edit/${expense.id}`} className="list-item">
        <div>
          <div>{expense.description}</div>
          <div>{moment(expense.createdAt).format('MMMM Do YYYY, LT')}</div>
        </div>

        <div>{formattedAmount}</div>
    </Link>
  );
}

export default ExpenseListItem;