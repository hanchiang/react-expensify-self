import { LOGIN, LOGOUT, AUTH_LOGIN_ERROR, 
  CREATE_USER_ERROR, REMOVE_CREATE_USER_ERROR,
  SEND_PASSWORD_RESET_ERROR
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
    case CREATE_USER_ERROR:
      return { 
        ...state,
        createUserError: action.createUserError
      };
    case REMOVE_CREATE_USER_ERROR:
      const {createUserError, ...rest} = state;
      return {...rest};
    case SEND_PASSWORD_RESET_ERROR:
      return {
        ...state,
        sendPasswordResetError: action.sendPasswordResetError
      };
    case AUTH_LOGIN_ERROR:
      return {
        ...state,
        loginError: action.loginError
      }
    default:
      return state;
  }
}

export default authReducer;