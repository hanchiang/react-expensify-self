import {
  LOGIN, LOGOUT, SET_AUTH_LOGIN_ERROR, 
  SET_CREATE_USER_ERROR,
  SET_SEND_PASSWORD_RESET_ERROR, SET_AUTH_USER_PROFILE, SET_SEND_PASSWORD_RESET_SUCCESS
} from '../constants/actionTypes';

const authReducer = (state = {}, action) => {
  switch(action.type) {
    case 'LOGIN':
      return {
        user: state.user,
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
    console.log(action.user);
      return {
        uid: state.uid,
        user: action.user
      };
    case SET_SEND_PASSWORD_RESET_SUCCESS:
      return {
        ...state,
        sendPasswordResetSuccess: action.sendPasswordResetSuccess
      };
    default:
      return state;
  }
}

export default authReducer;