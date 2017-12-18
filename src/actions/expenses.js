import { ADD_EXPENSE, EDIT_EXPENSE, REMOVE_EXPENSE } from '../constants/actionTypes';
import uuid from 'uuid/v4';

const addExpense = (expense) => ({
  type: ADD_EXPENSE,
  expense
});

const editExpense = (id, updates) => ({
  type: EDIT_EXPENSE,
  id,
  updates
});

const removeExpense = (id) => ({
  type: REMOVE_EXPENSE,
  id
});

export { addExpense, editExpense, removeExpense };