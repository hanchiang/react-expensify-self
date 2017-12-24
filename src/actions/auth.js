import firebase, { googleAuthProvider } from '../firebase/firebase';
import {
  LOGIN, LOGOUT, AUTH_LOGIN, AUTH_LOGOUT, SET_AUTH_LOGIN_ERROR, SET_AUTH_USER_PROFILE,
  START_LINK_AUTH_PROVIDER, START_CREATE_USER, SET_CREATE_USER_ERROR,
  START_SEND_PASSWORD_RESET, SET_SEND_PASSWORD_RESET_ERROR, SET_SEND_PASSWORD_RESET_SUCCESS
} from '../constants/actionTypes';

const login = (uid) => ({
  type: LOGIN,
  uid
});

const logout = () => ({
  type: LOGOUT
});

// Async actions
// payload: { type: 'google' || 'password' || 'facebook'}
const startLogin = (payload) => ({
  type: AUTH_LOGIN,
  payload
});

const startLogout = () => ({
  type: AUTH_LOGOUT
});

const startLinkAuthProvider = (provider) => ({
  type: START_LINK_AUTH_PROVIDER,
  provider
});

const startCreateUser = (user) => ({
  type: START_CREATE_USER,
  user
});

const startSendPasswordReset = (email) => ({
  type: START_SEND_PASSWORD_RESET,
  email
});

// setter actions
const setLoginError = (error) => ({
  type: SET_AUTH_LOGIN_ERROR,
  loginError: error
});

const setCreateUserError = (error) => ({
  type: SET_CREATE_USER_ERROR,
  createUserError: error
});

const setSendPasswordResetError = (error) => ({
  type: SET_SEND_PASSWORD_RESET_ERROR,
  sendPasswordResetError: error
});

const setSendPasswordResetSuccess = (isSuccess) => ({
  type: SET_SEND_PASSWORD_RESET_SUCCESS,
  sendPasswordResetSuccess: isSuccess
});

const setAuthUserProfile = (user) => ({
  type: SET_AUTH_USER_PROFILE,
  user
});

export {
  login, logout, startLinkAuthProvider,
  startLogin, startLogout, startCreateUser, startSendPasswordReset,
  setCreateUserError, setLoginError, setSendPasswordResetError, setAuthUserProfile, setSendPasswordResetSuccess
};