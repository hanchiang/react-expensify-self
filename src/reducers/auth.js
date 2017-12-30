import {
  LOGIN, LOGOUT, SET_AUTH_LOGIN_ERROR, 
  SET_CREATE_USER_ERROR, SET_LINK_EMAIL_AUTH_PROVIDER_ERROR, SET_LINK_EMAIL_AUTH_PROVIDER_SUCCESS,
  SET_SEND_PASSWORD_RESET_ERROR, SET_AUTH_USER_PROFILE, SET_SEND_PASSWORD_RESET_SUCCESS,
  SET_CLOSE_LINK_EMAIL_MODAL, SET_SIGN_IN_PROVIDER
} from '../constants/actionTypes';

const authReducer = (state = {}, action) => {
  switch(action.type) {
    case 'LOGIN':
      return {
        ...state,
        uid: action.uid
      };
    case 'LOGOUT':
      return {};
    case SET_CREATE_USER_ERROR:
      return { 
        ...state,
        createUserError: action.createUserError
      };
    case SET_SEND_PASSWORD_RESET_ERROR:
      return {
        ...state,
        sendPasswordResetError: action.sendPasswordResetError
      };
    case SET_AUTH_LOGIN_ERROR:
      return {
        ...state,
        loginError: action.loginError
      }
    case SET_AUTH_USER_PROFILE:
      return {
        ...state,
        user: action.user
      };
    case SET_SEND_PASSWORD_RESET_SUCCESS:
      return {
        ...state,
        sendPasswordResetSuccess: action.sendPasswordResetSuccess
      };
    case SET_LINK_EMAIL_AUTH_PROVIDER_ERROR:
      return {
        ...state,
        linkEmailAuthProviderError: action.linkEmailAuthProviderError
      }
    case SET_LINK_EMAIL_AUTH_PROVIDER_SUCCESS:
      return {
        ...state,
        linkEmailAuthProviderSuccess: action.linkEmailAuthProviderSuccess
      }
    case SET_CLOSE_LINK_EMAIL_MODAL:
      return {
        ...state,
        shouldCloseLinkEmailModal: action.shouldCloseLinkEmailModal
      }
    case SET_SIGN_IN_PROVIDER:
      return { 
        ...state,
        signInProvider: action.signInProvider
      };
    default:
      return state;
  }
}

export default authReducer;