import firebase, { googleAuthProvider } from '../firebase/firebase';
import { LOGIN, LOGOUT, AUTH_LOGIN, AUTH_LOGOUT } from '../constants/actionTypes';

const login = (uid) => ({
  type: LOGIN,
  uid
});

const logout = () => ({
  type: LOGOUT
});

const startLogin = () => ({
  type: AUTH_LOGIN
});

const startLogout = () => ({
  type: AUTH_LOGOUT
});

export { startLogin, startLogout, login, logout };