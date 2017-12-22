import { call, put } from 'redux-saga/effects';

import { auth, googleAuthProvider } from '../firebase/firebase';
import { createUser, verifyEmail, signInWithPopup, 
  signInWithEmailAndPassword, sendPasswordResetEmail 
} from '../api/auth';
import { createUserError, sendPasswordResetError } from '../actions/auth';

function* handleLogin(action) {
  // yield auth.signInWithPopup(googleAuthProvider);
  const { payload } = action;
  const { type: loginType } = payload;
  let user, error;
  console.log(payload);
  console.log(loginType);
  
  // https://firebase.google.com/docs/reference/js/firebase.auth#.UserCredential
  if (loginType === 'google') {
    ({user, error} = yield call(signInWithPopup, googleAuthProvider));
  } else if (loginType === 'password') {
    const { email, password } = payload;
    ({ user, error } = yield call(signInWithEmailAndPassword, email, password));
    console.log(user, error);
  }

  if (error) {
    console.log(error);
    const { code: errorCode, message: errorMessage } = error;
    switch (errorCode) {
      case 'auth/invalid-email':
        // yield put(createUserError(errorMessage));
        break;
      case 'auth/user-disabled':
        break;
      case 'auth/user-not-found':
        break;
      case 'auth/wrong-password':
        break;
      default:
      // console.log(errorMessage);
    }
  }
}

function* handleLogout(action) {
  const data = yield call([auth, auth.signOut]);  // returns undefined
}

function* handleCreateUser(action) {
  const { email, password } = action;
  const { user, error } = yield call(createUser, email, password);

  if (error) {
    console.log(error);
    const { code: errorCode, message: errorMessage } = error;

    switch(errorCode) {
        case 'auth/email-already-in-use':
          yield put(createUserError(errorMessage));
          break;
        default:
          // console.log(errorMessage);
    }
  } else {
    const { error } = yield call(verifyEmail);
    if (error) {
      console.log('error while sending verification email');
      console.log(error);
    } else {
      console.log('Verification email sent!');
    }
  }
}

function* handleSendPasswordReset(action) {
  const { email } = action;
  const { error } = yield call(sendPasswordResetEmail, email);
  if (error) {
    console.log(error);
    const { code: errorCode, message: errorMessage } = error;

    switch (errorCode) {
      case 'auth/user-not-found':
        yield put(sendPasswordResetError(errorMessage));
        break;
      default:
        // console.log(errorMessage);
    }
  }
}


export { handleLogin, handleLogout, handleCreateUser, handleSendPasswordReset };