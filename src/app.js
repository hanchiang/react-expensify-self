import React from 'react';
import ReactDOM from 'react-dom';
import 'react-dates/initialize';
import { Provider } from 'react-redux';
import moment from 'moment';
import jwtDecode from 'jwt-decode';

import AppRouter, { history } from './routers/AppRouter';
import store from './store/store';
import { auth } from './firebase/firebase';
import { login, logout, setAuthUserProfile, setSignInProvider } from './actions/auth';
import LoadingPage from './components/LoadingPage';

import { addExpense, editExpense, removeExpense, startSetExpense } from './actions/expenses';
import { setFilterText, sortByDate, sortByAmount, setStartDate, setEndDate } from './actions/filters';


import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';


export function App() {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>    
  );
}

export const renderApp = () => {
  ReactDOM.render(<App/>, document.getElementById('app'));
}

/*
export const jsx = (
  <AppContainer>
    <Provider store={store}>
      <AppRouter />
    </Provider>
  </AppContainer>
);
*/



// renderApp();
/*
if (module.hot) {
  module.hot.accept('./app', () => { renderApp() })
}
*/

// Will run when a user first visits the web page and when page refresh
auth.onAuthStateChanged((user) => {
  if (user) {
    // https://firebase.google.com/docs/reference/js/firebase.User
    console.log(user);
    auth.currentUser.getIdToken(true)
    .then(idToken => {
      const decodedToken = jwtDecode(idToken);
      console.log(decodedToken);
      const signInProvider = decodedToken.firebase.sign_in_provider;
      console.log('Signed in provider:', signInProvider);
      store.dispatch(setSignInProvider(signInProvider));

      const { providerData } = user;
      providerData.forEach(provider => {
        if (provider.providerId === signInProvider) {
          console.log('Provider ID:', provider.providerId);
          console.log('Provider UID:', provider.uid);
          console.log('Display name:', provider.displayName);
          console.log('Email:', provider.email);
        }
      });
    });

    store.dispatch(login(user.uid));
    store.dispatch(setAuthUserProfile(user));
    ReactDOM.render(<LoadingPage />, document.getElementById('app'));
    store.dispatch(startSetExpense());
      // Impt: Only redirect to dashboard when the current page is the login page
      if (history.location.pathname === '/') {
        console.log('redirecting to dashboard');
        history.push('/dashboard');
      }
  } else {
    // todo: reset state. Not so important?
    console.log(user);
    store.dispatch(logout());
    renderApp();
    // history.push('/');
  }
});