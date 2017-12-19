import {
  SET_TEXT_FILTER, SORT_BY_DATE, SORT_BY_AMOUNT,
  SET_START_DATE, SET_END_DATE
} from '../../constants/actionTypes';
import { setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate } from '../../actions/filters';
import moment from 'moment';

test('should return setTextfilter action object', () => {
  const text = 'water';
  const expectedAction = {
    type: SET_TEXT_FILTER,
    text
  };
  expect(setTextFilter(text)).toEqual(expectedAction);
});

test('should return sortByDate action object', () => {
  const expectedAction = {
    type: SORT_BY_DATE
  };
  expect(sortByDate()).toEqual(expectedAction);
});

test('should return sortByAmount action object', () => {
  const expectedAction = {
    type: SORT_BY_AMOUNT
  };
  expect(sortByAmount()).toEqual(expectedAction);
});

test('should return setStartDate action object', () => {
  const startDate = moment();
  const expectedAction = {
    type: SET_START_DATE,
    startDate
  };
  expect(setStartDate(startDate)).toEqual(expectedAction);
});

test('should return setEndDate action object', () => {
  const endDate = moment();
  const expectedAction = {
    type: SET_END_DATE,
    endDate
  };
  expect(setEndDate(endDate)).toEqual(expectedAction);
});