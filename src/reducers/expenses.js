import { ADD_EXPENSE, EDIT_EXPENSE, REMOVE_EXPENSE, SET_EXPENSE } from '../constants/actionTypes';

/*
expense = {
  id: 1,
  description: 'hello',
  note: '', (optional)
  createdAt: 123
}
*/

const initialState = [];

function expensesReducer(state = initialState, action) {
  switch(action.type) {
    case ADD_EXPENSE:
      return [...state, action.expense];
    case EDIT_EXPENSE:
      return state.map(expense => {
        if (expense.id === action.id) {
          return {
            ...expense,
            ...action.updates
          };
        } else {
          return expense;
        }
      });
    case REMOVE_EXPENSE:
      return state.filter(expense => expense.id !== action.id);
    case SET_EXPENSE:
      return action.expenses
    default:
      return state;
  }
}

export default expensesReducer;