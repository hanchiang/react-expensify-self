import { 
  SET_TEXT_FILTER, SORT_BY_DATE, SORT_BY_AMOUNT, 
  SET_START_DATE, SET_END_DATE 
} from '../constants/actionTypes';

const setTextFilter = (text) => ({
  type: SET_TEXT_FILTER,
  text
});

const sortByDate = () => ({
  type: SORT_BY_DATE
});

const sortByAmount = () => ({
  type: SORT_BY_AMOUNT
});

const setStartDate = (startDate) => ({
  type: SET_START_DATE,
  startDate
});

const setEndDate = (endDate) => ({
  type: SET_END_DATE,
  endDate
});

export { setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate };