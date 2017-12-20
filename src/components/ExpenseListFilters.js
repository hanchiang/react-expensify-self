import React from 'react';
import { connect } from 'react-redux';
import { DateRangePicker } from 'react-dates';

import { setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate } from '../actions/filters';

class ExpenseListFilters extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      focusedInput: null
    };
  }
  handleTextFilterChange = (event) => this.props.setTextFilter(event.target.value);
  handleSortFilterChange = (event) => this.props.setSortBy(event.target.value);
  onDatesChange = ({startDate, endDate}) => {
    this.props.setStartDate(startDate);
    this.props.setEndDate(endDate);
  }
  onFocusChange = (focusedInput) => this.setState({focusedInput});


  render () {
    return (
      <div>
        <div className="input-group">
          <div className="input-group-item">
            <input type="text" className="text-input" onChange={this.handleTextFilterChange} placeholder="Search expense" />
          </div>

          <div className="input-group-item">
            <select value={this.props.sortBy} className="select" onChange={this.handleSortFilterChange}>
              <option value="date">Date</option>
              <option value="amount">Amount</option>
            </select>
          </div>

          <div className="input-group-item date-range-picker">
            <DateRangePicker
              startDate={this.props.startDate}
              endDate={this.props.endDate}
              onDatesChange={this.onDatesChange}
              focusedInput={this.state.focusedInput}
              onFocusChange={this.onFocusChange}
              startDateId={'1'}
              endDateId={'2'}
              numberOfMonths={1}
              isOutsideRange={() => false}
              showClearDates={true}
            />
          </div>
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state) => ({
  sortBy: state.filters.sortBy,
  startDate: state.filters.startDate,
  endDate: state.filters.endDate
});

const mapDispatchToProps = (dispatch) => ({
  setTextFilter: (value) => dispatch(setTextFilter(value)),
  setSortBy: (value) => value === 'date' ? dispatch(sortByDate()) : dispatch(sortByAmount()),
  setStartDate: (startDate) => dispatch(setStartDate(startDate)),
  setEndDate: (endDate) => dispatch(setEndDate(endDate))
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilters);