import { all, takeEvery } from 'redux-saga/effects';

import { AUTH_LOGIN, AUTH_LOGOUT, START_ADD_EXPENSE, START_SET_EXPENSE } from '../constants/actionTypes';
import { handleLogin, handleLogout } from './auth';
import { handleAddExpense, handleSetExpense } from './expenses';

// Root saga
function* watchAll() {
  yield all([
    takeEvery(AUTH_LOGIN, handleLogin),
    takeEvery(AUTH_LOGOUT, handleLogout),
    takeEvery(START_ADD_EXPENSE, handleAddExpense),
    takeEvery(START_SET_EXPENSE, handleSetExpense),
  ]);
}

export default watchAll;