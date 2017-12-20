import React from 'react';
import moment from 'moment';
import numeral from 'numeral';
import { Link } from 'react-router-dom';

function ExpenseListItem(props) {
  const { expense } = props;
  const formattedAmount = numeral(expense.amount / 100).format('$0,0.00');
  return (
    <Link to={`/edit/${expense.id}`} className="list-item">
      <div>
        <h3 className="list-item-title">{expense.description}</h3>
        <span className="list-item-sub-title">{moment(expense.createdAt).format('MMMM Do, YYYY')}</span>
      </div>

      <h3 className="list-item-data">{formattedAmount}</h3>
    </Link>
  );
}

export default ExpenseListItem;