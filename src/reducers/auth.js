import { LOGIN, LOGOUT, CREATE_USER_ERROR, SEND_PASSWORD_RESET_ERROR } from '../constants/actionTypes';

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
    case SEND_PASSWORD_RESET_ERROR:
      return {
        ...state,
        sendPasswordResetError: action.sendPasswordResetError
      };
    default:
      return state;
  }
}

export default authReducer;