import { call, put } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { auth, googleAuthProvider } from '../firebase/firebase';
import { createUser, verifyEmail, signInWithPopup, 
  signInWithEmailAndPassword, sendPasswordResetEmail ,
  updateUserProfile, linkAuthProvider
} from '../api/auth';
import { 
  setCreateUserError, setSendPasswordResetError, setLoginError,
  setAuthUserProfile, setSendPasswordResetSuccess
} from '../actions/auth';
import { history } from '../routers/AppRouter';


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
        yield put(setLoginError(errorMessage));
      default:
      // console.log(errorMessage);
    }
  } else {
    // console.log('set auth user for google login!');
    yield put(setAuthUserProfile(user));
  }
}

function* handleLinkAuthProvider(action) {
  const { provider } = action;
  const { user, error } = yield call(linkAuthProvider, provider);

  if (error) {
    console.log(error);
  } else {
    console.log('link auth provider success!');
    console.log(user);
  }
}

function* handleLogout(action) {
  yield call([auth, auth.signOut]);
}

// 1. create user
// 2. Set display name to firstname
// 3. Set auth user
// 4. send verification email
function* handleCreateUser(action) {
  const { email, password, firstName, lastName } = action.user;
  // Automatically logs in if the call succeeds
  const { user, error } = yield call(createUser, email, password);
  console.log(user);

  if (error) {
    console.log(error);
    const { code: errorCode, message: errorMessage } = error;

    switch(errorCode) {
        case 'auth/email-already-in-use':
        case 'auth/invalid-email':
        case 'auth/operation-not-allowed':
        case 'auth/weak-password':
          yield put(setCreateUserError(errorMessage));
        default:
          // console.log(errorMessage);
    }
  } 
  else {
    console.log('create user success! logging in..');
    const { error } = yield call(updateUserProfile, user, {displayName: firstName, photoURL: ''});

    if (error) {
      console.log('error while updating user profile');
      // yield error..
    } else {
      const user = auth.currentUser;
      console.log(user);
      yield put(setAuthUserProfile(user));

      const { error } = yield call(verifyEmail);
      if (error) {
        console.log(error);
      } else {
        console.log('Verification email sent!');
      }
    }
  }
}

function* handleSendPasswordReset(action) {
  const { email } = action;
  const { error } = yield call(sendPasswordResetEmail, email);
  // const { error } = {};
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
        yield put(setSendPasswordResetError(errorMessage));
        break;
      case 'auth/internal-error':
        yield put(setSendPasswordResetError('Reset password limit exceeded'));
      default:
        // console.log(errorMessage);
    }
  } else {
    console.log('Password reset email sent!');
    yield put(setSendPasswordResetSuccess(true));
    yield call(delay, 6000);
    yield put(setSendPasswordResetSuccess(false));
    history.push('/');
  }
}


export { handleLogin, handleLogout, handleCreateUser, handleSendPasswordReset, handleLinkAuthProvider };