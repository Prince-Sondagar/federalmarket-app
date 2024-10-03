import {RootDispatch} from '..';
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
import API from '../../utils/axios';
import {
  clearAsyncStorage,
  getItemAsyncStorage,
  setItemAsyncStorage,
} from '../../utils';
import {ACCESS_TOKEN, TEMP_ACCESS_TOKEN} from '../../constants';

export const sendOTP = (mobileNo: string) => async (dispatch: RootDispatch) => {
  try {
    dispatch({type: SEND_OTP_REQUEST});
    const response = await API.post('/sendOtp', {
      email: 'Milan@gmail.com',
      communicationId: `+91${mobileNo}`,
      channel: 'sms',
    });
    const data = await response.data;

    console.log('data ==> ', data);

    if (data.status_code === '200') {
      dispatch({
        type: SEND_OTP_SUCCESS,
        payload: {
          message: 'OTP send successfully!',
          mobileNo: mobileNo,
        },
      });
      return true;
    }
  } catch (error: any) {
    dispatch({
      type: SEND_OTP_FAILURE,
      payload: 'Failed to send OTP. Please try again.',
    });
    return false;
  }
};

export const verifyOTP =
  (otp: string, communicationId: string) => async (dispatch: RootDispatch) => {
    try {
      dispatch({type: VERIFY_OTP_REQUEST});
      const response = await API.post('/verifyOtp', {
        email: 'Milan@gmail.com',
        communicationId: `+91${communicationId}`,
        channel: 'sms',
        otp: otp,
      });
      const data = await response.data;
      console.log('data.token ==> ', data.token);

      if (data.status_code === '200') {
        dispatch({
          type: VERIFY_OTP_SUCCESS,
          payload: {
            ...data,
            message: 'OTP verify successfully!',
          },
        });
        await setItemAsyncStorage(TEMP_ACCESS_TOKEN, data.token);
        return true;
      } else {
        throw new Error(`Failed to verify OTP.Please try again`);
      }
    } catch (error: any) {
      dispatch({
        type: VERIFY_OTP_FAILURE,
        payload: error.message ?? 'Failed to verify OTP. Please try again.',
      });
      return false;
    }
  };

export const checkAuth = () => async (dispatch: RootDispatch) => {
  const token = await getItemAsyncStorage(ACCESS_TOKEN);
  if (token) {
    dispatch({
      type: SET_LOGGEDIN,
      payload: {
        token: token,
      },
    });
  }
  return token;
};

export const logOut = () => async (dispatch: RootDispatch) => {
  try {
    dispatch({type: LOGOUT_REQUEST});
    await clearAsyncStorage();
    await dispatch({type: LOGOUT_SUCCESS});
    return true;
  } catch (error) {
    dispatch({type: LOGOUT_FAILURE});
    return false;
  }
};
