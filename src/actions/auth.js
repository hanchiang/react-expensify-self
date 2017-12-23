import firebase, { googleAuthProvider } from '../firebase/firebase';
import {
  LOGIN, LOGOUT, AUTH_LOGIN, AUTH_LOGIN_ERROR, AUTH_LOGOUT,
  CREATE_USER, CREATE_USER_ERROR, REMOVE_CREATE_USER_ERROR,
  SEND_PASSWORD_RESET, SEND_PASSWORD_RESET_ERROR
} from '../constants/actionTypes';

const login = (uid) => ({
  type: LOGIN,
  uid
});

const logout = () => ({
  type: LOGOUT
});

const startLogin = (payload) => ({
  type: AUTH_LOGIN,
  payload
});

const startLoginError = (error) => ({
  type: AUTH_LOGIN_ERROR,
  loginError: error
});

const startLogout = () => ({
  type: AUTH_LOGOUT
});

const createUser = (email, password) => ({
  type: CREATE_USER,
  email,
  password
});

const createUserError = (error) => ({
  type: CREATE_USER_ERROR,
  createUserError: error
});

const removeCreateUserError = () => ({
  type: REMOVE_CREATE_USER_ERROR
});

const sendPasswordReset = (email) => ({
  type: SEND_PASSWORD_RESET,
  email
});

const sendPasswordResetError = (error) => ({
  type: SEND_PASSWORD_RESET_ERROR,
  sendPasswordResetError: error
});

export {
  login, startLogin, startLoginError, logout, startLogout, 
  createUser, createUserError, removeCreateUserError,
  sendPasswordReset, sendPasswordResetError 
};