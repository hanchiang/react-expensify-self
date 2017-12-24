import { all, takeEvery } from 'redux-saga/effects';

import { 
  AUTH_LOGIN, AUTH_LOGOUT, START_LINK_AUTH_PROVIDER,
  START_ADD_EXPENSE, START_SET_EXPENSE, START_EDIT_EXPENSE, START_REMOVE_EXPENSE,
  START_CREATE_USER, START_SEND_PASSWORD_RESET
} from '../constants/actionTypes';
import { handleLogin, handleLogout, handleCreateUser, handleSendPasswordReset, handleLinkAuthProvider } from './auth';
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
    takeEvery(START_CREATE_USER, handleCreateUser),
    takeEvery(START_SEND_PASSWORD_RESET, handleSendPasswordReset),
    takeEvery(START_LINK_AUTH_PROVIDER, handleLinkAuthProvider)
  ]);
}

export default watchAll;