import { firebase, googleAuthProvider } from '../firebase/firebase';

const login = (uid) => ({
  type: 'LOGIN',
  uid
});

const logout = () => ({
  type: 'LOGOUT'
});

const startLogin = () => {
  return () => {
    return firebase.auth().signInWithPopup(googleAuthProvider);
  }
}

const startLogout = () => {
  return () => {
    return firebase.auth().signOut();
  }
}

export { startLogin, startLogout, login, logout };