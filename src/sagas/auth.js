import { call } from 'redux-saga/effects';

import { auth, googleAuthProvider } from '../firebase/firebase';
import { createUser, verifyEmail } from '../api/auth';

function* handleLogin(action) {
  // yield auth.signInWithPopup(googleAuthProvider);
  try {
    // https://firebase.google.com/docs/reference/js/firebase.auth#.UserCredential
    const userCredential = yield call([auth, auth.signInWithPopup], googleAuthProvider);
  } catch(error) {
    console.log('log in error');
    console.log(error);
  }
}

function* handleLogout(action) {
  const data = yield call([auth, auth.signOut]);  // returns undefined
}

function* handleCreateUser(action) {
  const { email, password } = action;
  const { user, error } = yield call(createUser, email, password);

  if (error) {
    console.log('error while creating user');
    console.log(error);
    const { code: errorCode, message: errorMessage } = error;

    switch(errorCode) {
        case 'auth/email-already-in-use':
          // TODO: dispatch action
          break;
        default:
          console.log(errorMessage);
    }
  } else {
    const { error } = yield call(verifyEmail);
    if (error) {
      console.log('error while sending verification email');
      console.log(error);
    } else {
      console.log('Email sent!');
    }
  }
}


export { handleLogin, handleLogout, handleCreateUser };