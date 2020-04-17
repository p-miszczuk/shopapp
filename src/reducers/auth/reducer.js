import {
  LOGIN_ERROR,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_ERROR,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS
} from "./actions";

const initialState = {
  auth: false,
  error: "",
  request: false,
  logoutError: ""
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_ERROR: {
      return {
        ...state,
        error: action.payload,
        request: false
      };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        auth: true,
        error: false,
        request: false
      };
    }
    case LOGIN_REQUEST: {
      return {
        ...state,
        request: true
      };
    }
    case LOGOUT_ERROR: {
      return {
        ...state,
        logoutError: action.payload
      };
    }
    case LOGOUT_REQUEST: {
      return {
        ...state
      };
    }
    case LOGOUT_SUCCESS: {
      return {
        ...state
      };
    }
    default:
      return state;
  }
};
