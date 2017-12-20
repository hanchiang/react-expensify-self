import {
  ADD_EXPENSE, START_ADD_EXPENSE, 
  EDIT_EXPENSE, START_EDIT_EXPENSE,
  REMOVE_EXPENSE, START_REMOVE_EXPENSE,
  SET_EXPENSE, START_SET_EXPENSE
} from '../constants/actionTypes';

const addExpense = (expense) => ({
  type: ADD_EXPENSE,
  expense
});

const startAddExpense = (expense) => ({
  type: START_ADD_EXPENSE,
  expense
});

const editExpense = (id, updates) => ({
  type: EDIT_EXPENSE,
  id,
  updates
});

const startEditExpense = (id, updates) => ({
  type: START_EDIT_EXPENSE,
  id,
  updates
});

const removeExpense = (id) => ({
  type: REMOVE_EXPENSE,
  id
});

const startRemoveExpense = (id) => ({
  type: START_REMOVE_EXPENSE,
  id
});

const setExpense = (expenses) => ({
  type: SET_EXPENSE,
  expenses
});

const startSetExpense = () => ({
  type: START_SET_EXPENSE
});

export { 
  addExpense, startAddExpense, editExpense, startEditExpense,
  removeExpense, startRemoveExpense, setExpense, startSetExpense
};