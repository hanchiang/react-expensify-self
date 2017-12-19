import { auth, googleAuthProvider } from '../firebase/firebase';

function* handleLogin(action) {
  yield auth.signInWithPopup(googleAuthProvider).then(result => {
    console.log('login success!');
    // console.log(result);
    const { user } = result;
  }).catch(error => {
    console.log('There was an error logging in');
    console.log(error);
  });
}

function* handleLogout(action) {
  yield auth.signOut();
}

export { handleLogin, handleLogout };