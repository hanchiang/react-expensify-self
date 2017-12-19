import {
  SET_TEXT_FILTER, SORT_BY_DATE, SORT_BY_AMOUNT,
  SET_START_DATE, SET_END_DATE
} from '../../constants/actionTypes';
import filtersReducer from '../../reducers/filters';
import { defaultFilter, textFilter, sortByAmountFilter } from '../fixtures/filters';
import moment from 'moment';

test('should set text filter', () => {
  const text = 'bill';
  const action = {
    type: SET_TEXT_FILTER,
    text
  };
  const state = defaultFilter;
  const expectedState = {
    ...defaultFilter,
    text
  };
  expect(filtersReducer(state, action)).toEqual(expectedState);
});

test('should set sort by date', () => {
  const action = {
    type: SORT_BY_DATE
  };
  const state = sortByAmountFilter;
  const expectedState = {
    ...state,
    sortBy: 'date'
  };
  expect(filtersReducer(state, action)).toEqual(expectedState);
});

test('should set sort by amount', () => {
  const action = {
    type: SORT_BY_AMOUNT
  };
  const state = defaultFilter;
  const expectedState = {
    ...state,
    sortBy: 'amount'
  };
  expect(filtersReducer(state, action)).toEqual(expectedState);
});

test('should set start date filter', () => {
  const startDate = moment().subtract(7, 'days');
  const action = {
    type: SET_START_DATE,
    startDate
  };
  const state = defaultFilter;
  const expectedState = {
    ...defaultFilter,
    startDate
  };
  expect(filtersReducer(state, action)).toEqual(expectedState);
});

test('should set end date filter', () => {
  const endDate = moment().add(7, 'days');
  const action = {
    type: SET_END_DATE,
    endDate
  };
  const state = defaultFilter;
  const expectedState = {
    ...defaultFilter,
    endDate
  };
  expect(filtersReducer(state, action)).toEqual(expectedState);
});