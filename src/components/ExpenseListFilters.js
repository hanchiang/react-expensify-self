import React from 'react';
import { connect } from 'react-redux';

import { setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate } from '../actions/filters';

function ExpenseListFilters(props) {
  const handleTextFilterChange = (event) => props.setTextFilter(event.target.value);
  const handleSortFilterChange = (event) => props.setSortBy(event.target.value);

  return (
    <div>
      <input type="text" onChange={handleTextFilterChange} />
      <select value={props.sortBy} onChange={handleSortFilterChange}>
        <option value="date">Date</option>
        <option value="amount">Amount</option>
      </select>
    </div>
  )
}

const mapStateToProps = (state) => ({
  sortBy: state.filters.sortBy
});

const mapDispatchToProps = (dispatch) => ({
  setTextFilter: (value) => dispatch(setTextFilter(value)),
  setSortBy: (value) => value === 'date' ? dispatch(sortByDate()) : dispatch(sortByAmount())
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilters);