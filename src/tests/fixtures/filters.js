import moment from 'moment';

const defaultFilter = {
  text: '',
  sortBy: 'date',
  startDate: moment().startOf('month'),
  endDate: moment().endOf('month')
};

const textFilter = {
  text: 'bill',
  sortBy: 'date',
  startDate: moment().startOf('month'),
  endDate: moment().endOf('month')
}

const sortByAmountFilter = {
  text: '',
  sortBy: 'amount',
  startDate: moment().startOf('month'),
  endDate: moment().endOf('month')
}

export { defaultFilter, textFilter, sortByAmountFilter };