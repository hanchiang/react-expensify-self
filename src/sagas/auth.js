import { call, put } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { auth, googleAuthProvider } from '../firebase/firebase';
import { createUser, verifyEmail, signInWithPopup, 
  signInWithEmailAndPassword, sendPasswordResetEmail 
} from '../api/auth';
import { createUserError, removeCreateUserError, sendPasswordResetError, startLoginError } from '../actions/auth';

function* handleLogin(action) {
  // yield auth.signInWithPopup(googleAuthProvider);
  const { payload } = action;
  const { type: loginType } = payload;
  let user, error;
  
  // https://firebase.google.com/docs/reference/js/firebase.auth#.UserCredential
  if (loginType === 'google') {
    ({user, error} = yield call(signInWithPopup, googleAuthProvider));
  } else if (loginType === 'password') {
    const { email, password } = payload;
    ({ user, error } = yield call(signInWithEmailAndPassword, email, password));
    console.log(user, error);
  }

  // Only handle error for logging in with password
  if (error) {
    console.log(error);
    const { code: errorCode, message: errorMessage } = error;
    switch (errorCode) {
      case 'auth/invalid-email':
      case 'auth/user-disabled':
      case 'auth/user-not-found':
      case 'auth/wrong-password':
        yield put(startLoginError(errorMessage));
      default:
      // console.log(errorMessage);
    }
  }
}

function* handleLogout(action) {
  yield call([auth, auth.signOut]);
}

function* handleCreateUser(action) {
  const { email, password } = action;
  const { user, error } = yield call(createUser, email, password);

  if (error) {
    console.log(error);
    const { code: errorCode, message: errorMessage } = error;

    switch(errorCode) {
        case 'auth/email-already-in-use':
        case 'auth/invalid-email':
        case 'auth/operation-not-allowed':
        case 'auth/weak-password':
          yield put(createUserError(errorMessage));
          // yield call(delay, 5000);
          // yield put(removeCreateUserError());
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
      case 'auth/invalid-email':
      case 'auth/missing-android-pkg-name':
      case 'auth/missing-continue-uri':
      case 'auth/missing-ios-bundle-id':
      case 'auth/invalid-continue-uri':
      case 'auth/unauthorized-continue-uri':
      case 'auth/user-not-found':
        yield put(sendPasswordResetError(errorMessage));
      default:
        // console.log(errorMessage);
    }
  } else {
    console.log('Password reset email sent!');
  }
}


export { handleLogin, handleLogout, handleCreateUser, handleSendPasswordReset };