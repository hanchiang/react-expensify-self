import { auth, googleAuthProvider } from '../firebase/firebase';

function* handleLogin(action) {
  yield auth.signInWithPopup(googleAuthProvider);
}

function* handleLogout(action) {
  yield auth.signOut();
}

export { handleLogin, handleLogout };