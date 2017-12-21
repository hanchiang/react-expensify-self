import { all, takeEvery } from 'redux-saga/effects';

import { 
  AUTH_LOGIN, AUTH_LOGOUT, CREATE_USER,
  START_ADD_EXPENSE, START_SET_EXPENSE, START_EDIT_EXPENSE, START_REMOVE_EXPENSE
} from '../constants/actionTypes';
import { handleLogin, handleLogout, handleCreateUser } from './auth';
import { handleAddExpense, handleSetExpense, handleEditExpense, handleRemoveExpense } from './expenses';

// Root saga
function* watchAll() {
  yield all([
    takeEvery(AUTH_LOGIN, handleLogin),
    takeEvery(AUTH_LOGOUT, handleLogout),
    takeEvery(START_ADD_EXPENSE, handleAddExpense),
    takeEvery(START_SET_EXPENSE, handleSetExpense),
    takeEvery(START_EDIT_EXPENSE, handleEditExpense),
    takeEvery(START_REMOVE_EXPENSE, handleRemoveExpense),
    takeEvery(CREATE_USER, handleCreateUser)
  ]);
}

export default watchAll;