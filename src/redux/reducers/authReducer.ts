import {LOGIN, LOGOUT, STORE_USER_DETAILS} from '../constants';

const initialState = {
  isLoggedIn: false,
  user: null,
};

const authReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isLoggedIn: true,
      };

    case STORE_USER_DETAILS: {
      return {
        ...state,
        user: action.payload,
      };
    }
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    default:
      return state;
  }
};
export default authReducer;
