import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import moment from 'moment';

import AppRouter, { history } from './routers/AppRouter';
import store from './store/store';
import { auth } from './firebase/firebase';
import { login, logout } from './actions/auth';
import LoadingPage from './components/LoadingPage';

import { addExpense, editExpense, removeExpense, startSetExpense } from './actions/expenses';
import { setFilterText, sortByDate, sortByAmount, setStartDate, setEndDate } from './actions/filters';

import 'normalize.css/normalize.css';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import './styles/styles.scss';

export const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);
export const renderApp = () => ReactDOM.render(jsx, document.getElementById('app'));

/*
let hasRendered = false;
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(jsx, document.getElementById('app'));
    hasRendered = true;
  }
};
*/


ReactDOM.render(<LoadingPage />, document.getElementById('app'));

// Will run when a user first visits the web page and when page refresh

auth.onAuthStateChanged((user) => {
  if (user) {
    console.log(user);
    store.dispatch(login(user.uid));
    store.dispatch(startSetExpense());
      // Impt: Only redirect to dashboard when the current page is the login page
      if (history.location.pathname === '/') {
        history.push('/dashboard');
      }
  } else {
    // todo: reset state
    store.dispatch(logout());
    renderApp();
    history.push('/');
  }
});
