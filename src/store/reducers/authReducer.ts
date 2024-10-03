import {
  LOGOUT_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  SEND_OTP_FAILURE,
  SEND_OTP_REQUEST,
  SEND_OTP_SUCCESS,
  SET_LOGGEDIN,
  VERIFY_OTP_FAILURE,
  VERIFY_OTP_REQUEST,
  VERIFY_OTP_SUCCESS,
} from '../types/actionTypes';
import { AuthState } from '../types/stateTypes';

const initialState: AuthState = {
  user: null,
  isLoading: false,
  error: false,
  isLoggedIn: false,
  message: '',
  token: null,
  mobileNo: '',
};

const authReducer = (state = initialState as AuthState, action: any) => {
  switch (action.type) {
    //send otp
    case SEND_OTP_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case SEND_OTP_SUCCESS:
      return {
        ...state,
        error: false,
        isLoading: false,
        message: action.payload.message,
        mobileNo: action.payload.mobileNo,

      };
    case SEND_OTP_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: true,
        message: action.payload,
      };

    //verify otp
    case VERIFY_OTP_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case VERIFY_OTP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: false,
        message: action.payload.message,
        token: action.payload.token,
        user: action.payload.user_details,
      };
    case VERIFY_OTP_FAILURE:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: false,
        error: true,
        message: action.payload.message,
        token: null,
      };

    case SET_LOGGEDIN:
      return {
        ...state,
        isLoggedIn: true,
        token: action.payload.token,
      };
    case LOGOUT_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case LOGOUT_SUCCESS:
      return {
        isLoading: false,
        isLoggedIn: false,
        error: false,
        token: null,
        user: null,
      };
    case LOGOUT_FAILURE:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: true,
      };

    default:
      return state;
  }
};

export default authReducer;
