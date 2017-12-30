import { call, put, select } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import firebase, { auth, googleAuthProvider, facebookAuthProvider } from '../firebase/firebase';
import {
  createUser, verifyEmail, signInWithPopup, signInWithCredential, getEmailCredential,
  signInWithEmailAndPassword, sendPasswordResetEmail, reauthenticateWithCredential,
  updateUserProfile, linkAuthProvider, linkEmailAuthProvider, unlinkAuthProvider, reauthenticateWithPopup,
  updateEmail, getSignInProvider
} from '../api/auth';

import { 
  setCreateUserError, setSendPasswordResetError, setLoginError, setLinkEmailAuthProviderSuccess,
  setAuthUserProfile, setSendPasswordResetSuccess, setLinkEmailAuthProviderError, setCloseLinkEmailModal,
  setSignInProvider
} from '../actions/auth';
import { history } from '../routers/AppRouter';



function* handleLogin(action) {
  // yield auth.signInWithPopup(googleAuthProvider);
  const { payload } = action;
  const { type: loginType } = payload;
  let user, error;
  
  // https://firebase.google.com/docs/reference/js/firebase.auth#.UserCredential
  if (loginType === 'password') {
    const { email, password } = payload;
    ({ user, error } = yield call(signInWithEmailAndPassword, email, password));
  } else if (loginType === 'google') {
    ({user, error} = yield call(signInWithPopup, googleAuthProvider));
  } else if (loginType === 'facebook') {
    ({ user, error } = yield call(signInWithPopup, facebookAuthProvider));
  } 

  // Only handle error for logging in with password
  if (error) {
    console.log(error);
    const { code: errorCode, message: errorMessage } = error;
    yield put(setLoginError(errorMessage));
  } else {
    // console.log('set auth user for google login!');
    yield put(setAuthUserProfile(user));
  }
}

function* handleLogout(action) {
  yield call([auth, auth.signOut]);
}


// This method can be called when user is authenticated with both email and auth provider
// Linkage: 
//   Email to auth provider
//   Auth provider to auth provider
//   But not auth provider to email!
function* handleLinkAuthProvider(action) {
  const { provider } = action;
  const { userCredential, error } = yield call(linkAuthProvider, provider);

  if (error) {
    console.log(error);
    const { code: errorCode, message: errorMessage } = error;
    switch (errorCode) {
      case 'auth/requires-recent-login':
        // TODO: need to get credential for currently logged in provider
        // const { error } = yield call(reauthenticateWithCredential, credential);
      default:
        yield put(setLinkEmailAuthProviderError(errorMessage));
    }
  } else {
    console.log(userCredential);
    console.log('link auth provider success!');

    // set sign in provider!
    const signInProvider = yield call(getSignInProvider);
    console.log('signed in provider:', signInProvider);
    yield put(setSignInProvider(signInProvider));
  }
}

// Is only called when user is authenticated with auth provider, not email!
function* handleLinkEmailAuthProvider(action) {
  const { user: userInput } = action;
  const { firstName, lastName, email, password } = userInput;
  // console.log(credential);

  const { user, error } = yield call(linkEmailAuthProvider, userInput);

  if (error) {
    console.log(error);
    const { code: errorCode, message: errorMessage } = error;
    switch (errorCode) {
      case 'auth/requires-recent-login':
        // reauthenticate
        const state = yield select();
        const signInProvider = state.auth.signInProvider;
        const { userCredential, error } = yield call(reauthenticateWithPopup, signInProvider);

        if (error) {
          console.log(error);
          console.log('Failed to reauthenticate with:', signInProvider);
          yield put(setLinkEmailAuthProviderError(error.message));
        } else {
          // link email after reauthenticate
          console.log('Sucessfully reauthenticated with:', signInProvider);
          console.log(userCredential);
          const { user, error } = yield call(linkEmailAuthProvider, userInput);

          if (error) {
            console.log(error);
            const { code: errorCode, message: errorMessage } = error;
            yield put(setLinkEmailAuthProviderError(error.message));
          } else {
              console.log(user);
              console.log('link email auth provider success!');

              // update user profile
              const { error } = yield call(updateUserProfile, user, { displayName: firstName, photoURL: user.photoURL });
              if (error) {
                console.log('Error updating user profile');
              } else {
                console.log('Update user profile success!');
                yield put(setLinkEmailAuthProviderSuccess(true));

                // set sign in provider!
                const signInProvider = yield call(getSignInProvider);
                console.log('signed in provider:', signInProvider);
                yield put(setSignInProvider(signInProvider));

                yield call(delay, 4000);
                yield put(setCloseLinkEmailModal(true));
                yield put(setLinkEmailAuthProviderSuccess(false));
              }
          }
        }   
      default:
        yield put(setLinkEmailAuthProviderError(errorMessage));
    }
  } else {
    console.log(user);
    console.log('link email auth provider success!');
    // update user profile
    
    const { error } = yield call(updateUserProfile, user, { displayName: firstName, photoURL: user.photoURL });
    if (error) {
      console.log('Error updating user profile');
    } else {
      console.log('Update user profile success!');
      yield put(setLinkEmailAuthProviderSuccess(true));

      // set sign in provider!
      const signInProvider = yield call(getSignInProvider);
      console.log('signed in provider:', signInProvider);
      yield put(setSignInProvider(signInProvider));

      yield call(delay, 4000);
      yield put(setCloseLinkEmailModal(true));

    }
  }
}

function* handleUnlinkAuthProvider(action) {
  const { provider } = action;
  const state = yield select();
  const signInProvider = state.auth.signInProvider;

  if (signInProvider !== provider) {
    const { user, error } = yield call(unlinkAuthProvider, provider);

    if (error) {
      console.log(error);
      const { code: errorCode, message: errorMessage } = error;
      // TODO: yield error
    } else {
      console.log(user);
      console.log('unlink auth provider success!');
      yield put(setAuthUserProfile(user));

      // If unlink email, update email to use auth provider's email
      // Firebase admin panel doesn't automatically update this...
      if (provider === 'password') {
        // update email
        const providerData = state.auth.user.providerData;
        const providerDataLength = providerData.length;
        const { error } = yield call(updateEmail, providerData[providerDataLength-1].email);

        if (error) {
          console.log(error);
          console.log('Failed to update email')
        } else {
          console.log('Successfully unlinked email!');
        }
      }
    }
  } else {
    console.log('Cannot unlink the currently signed in auth provider');
  }
}


function* handleCreateUser(action) {
  const { email, password, firstName, lastName } = action.user;
  // 1. create user
  // Automatically logs in if the call succeeds
  const { user, error } = yield call(createUser, email, password);
  console.log(user);

  if (error) {
    console.log(error);
    const { code: errorCode, message: errorMessage } = error;
    yield put(setCreateUserError(errorMessage));
  } 
  else {
    // 2. Set display name to firstname
    console.log('create user success! logging in..');
    const { error } = yield call(updateUserProfile, user, {displayName: firstName, photoURL: user.photoURL});

    if (error) {
      console.log('error while updating user profile');
      // yield error..
    } else {
      // 3. Set auth user in redux store
      const user = auth.currentUser;
      console.log(user);
      yield put(setAuthUserProfile(user));

      // 4. send verification email
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

    if (errorCode === 'auth/internal-error') {
      yield put(setSendPasswordResetError('Reset password limit exceeded'));
    } else {
      yield put(setSendPasswordResetError(errorMessage));
    }
  } else {
    console.log('Password reset email sent!');
    yield put(setSendPasswordResetSuccess(true));
    yield call(delay, 6000);
    yield put(setSendPasswordResetSuccess(false));
    history.push('/');
  }
}

export { 
  handleLogin, handleLogout, handleCreateUser, handleLinkEmailAuthProvider,
  handleSendPasswordReset, handleLinkAuthProvider, handleUnlinkAuthProvider
};