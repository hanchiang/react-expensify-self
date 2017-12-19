import { database } from '../firebase/firebase';
import { select, put, call } from 'redux-saga/effects';
import React from 'react';
import ReactDOM from 'react-dom';

import { renderApp } from '../app';
import { addExpense, setExpense } from '../actions/expenses';

const addToDatabase = (expense, path) => {
  return database.ref(path).push(expense).then(ref => {
    return {
      id: ref.key,
      ...expense
    };
  });
}

const fetchFromDatabase = (path) => {
  let expenses = [];

  return database.ref(path).once('value').then(snapshot => {
    let expenses = [];
    snapshot.forEach(childSnapshot => {
      expenses.push({
        id: childSnapshot.key,
        ...childSnapshot.val()
      });
    });
    return expenses;
  });
}


const editToDataBase = (id, updates) => {

}

function* handleAddExpense(action) {
  const { expense } = action;
  const state = yield select();
  const uid = state.auth.uid;

  const path = `users/${uid}/expenses`;
  const addedExpense = yield call(addToDatabase, expense, path);
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

export { handleAddExpense, handleSetExpense };