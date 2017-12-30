import firebase, { googleAuthProvider } from '../firebase/firebase';
import {
  LOGIN, LOGOUT, AUTH_LOGIN, AUTH_LOGOUT, SET_AUTH_LOGIN_ERROR, SET_AUTH_USER_PROFILE,
  START_LINK_EMAIL_AUTH_PROVIDER, START_LINK_AUTH_PROVIDER, START_UNLINK_AUTH_PROVIDER, START_CREATE_USER,
  SET_CREATE_USER_ERROR, START_SEND_PASSWORD_RESET, SET_SEND_PASSWORD_RESET_ERROR,
  SET_LINK_EMAIL_AUTH_PROVIDER_SUCCESS, SET_SEND_PASSWORD_RESET_SUCCESS, SET_LINK_EMAIL_AUTH_PROVIDER_ERROR,
  SET_CURRENT_SIGN_IN_METHOD, SET_CLOSE_LINK_EMAIL_MODAL, SET_SIGN_IN_PROVIDER
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

// GoogleAuthProvider | FacebookAuthProvider
const startLinkAuthProvider = (provider) => ({
  type: START_LINK_AUTH_PROVIDER,
  provider
});

// google.com | facebook.com | 'password'
const startUnlinkAuthProvider = (provider) => ({
  type: START_UNLINK_AUTH_PROVIDER,
  provider
});

// user is an object that contains email, password, firstName and lastName
const startCreateUser = (user) => ({
  type: START_CREATE_USER,
  user
});

// user is an object that contains email, password, firstName and lastName
const startLinkEmailAuthProvider = (user) => ({
  type: START_LINK_EMAIL_AUTH_PROVIDER,
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

const setLinkEmailAuthProviderError = (error) => ({
  type: SET_LINK_EMAIL_AUTH_PROVIDER_SUCCESS,
  linkEmailAuthProviderError: error
});

const setCloseLinkEmailModal = (shouldCloseLinkEmailModal) => ({
  type: SET_CLOSE_LINK_EMAIL_MODAL,
  shouldCloseLinkEmailModal
});

const setLinkEmailAuthProviderSuccess = (isSuccess) => ({
  type: SET_LINK_EMAIL_AUTH_PROVIDER_SUCCESS,
  linkEmailAuthProviderSuccess: isSuccess
});

const setAuthUserProfile = (user) => ({
  type: SET_AUTH_USER_PROFILE,
  user
});

const setSignInProvider = (signInProvider) => ({
  type: SET_SIGN_IN_PROVIDER,
  signInProvider
});


export {
  login, logout, startLinkAuthProvider, startLinkEmailAuthProvider, startUnlinkAuthProvider,
  startLogin, startLogout, startCreateUser, startSendPasswordReset, setLinkEmailAuthProviderError,
  setCreateUserError, setLoginError, setSendPasswordResetError, setAuthUserProfile, setSendPasswordResetSuccess,
  setLinkEmailAuthProviderSuccess, setCloseLinkEmailModal, setSignInProvider
};