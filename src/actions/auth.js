import firebase, { googleAuthProvider } from '../firebase/firebase';
import { LOGIN, LOGOUT, AUTH_LOGIN, AUTH_LOGOUT, CREATE_USER } from '../constants/actionTypes';

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

const createUser = (email, password) => ({
  type: CREATE_USER,
  email,
  password
});

export { login, startLogin, logout, startLogout, createUser };