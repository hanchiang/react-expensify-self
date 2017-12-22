import { database } from '../firebase/firebase';
import { select, put, call } from 'redux-saga/effects';
import React from 'react';
import ReactDOM from 'react-dom';

import { renderApp } from '../app';
import { addExpense, setExpense, editExpense, removeExpense } from '../actions/expenses';
import { addToDatabase, fetchFromDatabase, editToDataBase, removeFromDatabase } from '../api/expenses';


function* handleAddExpense(action) {
  const { expense } = action;
  const state = yield select();
  const uid = state.auth.uid;

  const path = `users/${uid}/expenses`;
  const addedExpense = yield call(addToDatabase, path, expense);
  yield put(addExpense(addedExpense));
}

function* handleSetExpense(action) {
  const state = yield select();
  const uid = state.auth.uid;
  const path = `users/${uid}/expenses`;
  const expenses = yield call(fetchFromDatabase, path);
  yield put(setExpense(expenses));
  yield renderApp();
}

function* handleEditExpense(action) {
  const { updates, id } = action;
  const state = yield select();
  const uid = state.auth.uid;
  const path = `users/${uid}/expenses/${id}`;
  yield call(editToDataBase, path, updates);
  yield put(editExpense(id, updates));
}

function* handleRemoveExpense(action) {
  const { id } = action;
  const state = yield select();
  const uid = state.auth.uid;
  const path = `users/${uid}/expenses/${id}`;
  yield call(removeFromDatabase, path);
  yield put(removeExpense(id));
}

export { handleAddExpense, handleSetExpense, handleEditExpense, handleRemoveExpense };