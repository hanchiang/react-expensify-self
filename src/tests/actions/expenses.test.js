import { addExpense, editExpense, removeExpense } from '../../actions/expenses';
import { ADD_EXPENSE, EDIT_EXPENSE, REMOVE_EXPENSE } from '../../constants/actionTypes';

test('should return addExpense action object', () => {
  const expense = {
    description: 'hello',
    amount: 20,
    note: '',
    createdAt: 1000
  };
  const expectedAction = {
    type: ADD_EXPENSE,
    expense
  };
  expect(addExpense(expense)).toEqual(expectedAction)
});

test('should return editExpense action object', () => {
  const updates = {
    id: '1',
    description: 'hello',
    amount: 20,
    note: '',
    createdAt: 1000
  };
  const id = 1;
  const expectedAction = {
    type: EDIT_EXPENSE,
    id,
    updates
  };
  expect(editExpense(id, updates)).toEqual(expectedAction);
});

test('should return removeExpense action object', () => {
  const id = 1;
  const expectedAction = {
    type: REMOVE_EXPENSE,
    id
  };
  expect(removeExpense(id)).toEqual(expectedAction);
});