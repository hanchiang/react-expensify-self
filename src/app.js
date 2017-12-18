import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'react-dates/initialize';

import AppRouter, { history } from './routers/AppRouter';
import store from './store/store';
import { login, logout } from './actions/auth';
import { firebase } from './firebase/firebase';
import LoadingPage from './components/LoadingPage';

import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';

import { addExpense, editExpense, removeExpense } from './actions/expenses';
import { setFilterText, sortByDate, sortByAmount, setStartDate, setEndDate } from './actions/filters';

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

let hasRendered = false;
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(jsx, document.getElementById('app'));
    hasRendered = true;
  }
};

store.dispatch(addExpense({
  id: 1,
  description: 'rent',
  note: '',
  amount: 340,
  createdAt: 1000
}));

store.dispatch(addExpense({
  id: 2,
  description: 'water bill',
  note: '',
  amount: 123,
  createdAt: 0
}));

store.dispatch(addExpense({
  id: 3,
  description: 'phone bill',
  note: '',
  amount: 70,
  createdAt: -1000
}));

store.dispatch(editExpense(3, {
  description: 'family phone bill',
  amount: 150
}));

// store.dispatch(removeExpense(2));

// store.dispatch(setFilterText('bill'));
// store.dispatch(sortByAmount());
store.dispatch(setStartDate(-50));
store.dispatch(setEndDate(1000));


// ReactDOM.render(<LoadingPage />, document.getElementById('app'));
renderApp();


// Will run when a user first visits the web page and when page refresh
/*
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    console.log(user);

    store.dispatch(login(user.uid));
    renderApp();
      // Impt: Only redirect to dashboard when the current page is the login page
      if (history.location.pathname === '/') {
        history.push('/dashboard');
      }
  } else {
    console.log('Logged out');
    store.dispatch(logout());
    // todo: reset state
    renderApp();
    history.push('/');
  }
});
*/