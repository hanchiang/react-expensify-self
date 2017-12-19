import { ADD_EXPENSE, EDIT_EXPENSE, REMOVE_EXPENSE } from '../../constants/actionTypes';
import expensesReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses';

test('should add expense to an empty list', () => {
  const expense = {
    id: 1,
    description: 'bill',
    amount: 100,
    note: '',
    createdAt: 1000
  }
  const state = [];
  const action = {
    type: ADD_EXPENSE,
    expense
  };
  const expectedState = [expense];
  expect(expensesReducer(state, action)).toEqual(expectedState);
});

test('should add expense to a non-empty list', () => {
  const expense = {
    id: 1,
    description: 'bill',
    amount: 100,
    note: '',
    createdAt: 1000
  };
  const state = expenses;
  const action = {
    type: ADD_EXPENSE,
    expense
  };
  const expectedState = [...state, expense];
  expect(expensesReducer(state, action)).toEqual(expectedState);
});

test('should edit expense if it is found', () => {
  const id = 1;
  const updates = {
    amount: 921,
    note: 'due to inflation'
  };
  const action = {
    type: EDIT_EXPENSE,
    id,
    updates
  };
  const state = expenses;
  const expectedState = expenses.map(expense => {
    if (expense.id === id) {
      return {
        ...expense,
        ...updates
      };
    } else {
      return expense;
    }
  });
  expect(expensesReducer(state, action)).toEqual(expectedState);
});

test('should not edit expense if it is not found', () => {
  const id = 2293834;
  const updates = {
    amount: 921,
    note: 'due to inflation'
  };
  const action = {
    type: EDIT_EXPENSE,
    id,
    updates
  };
  const state = expenses;
  const expectedState = expenses;
  expect(expensesReducer(state, action)).toEqual(expectedState);
});

test('should remove expense if it is found', () => {
  const id = 1;
  const action = {
    type: REMOVE_EXPENSE,
    id
  };
  const state = expenses;
  const expectedState = expenses.filter(expense => expense.id !== id);
  expect(expensesReducer(state, action)).toEqual(expectedState);
});

test('should not remove expense if it is not found', () => {
  const id = 145231;
  const action = {
    type: REMOVE_EXPENSE,
    id
  };
  const state = expenses;
  const expectedState = expenses;
  expect(expensesReducer(state, action)).toEqual(expectedState);
});