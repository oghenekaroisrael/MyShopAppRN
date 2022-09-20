import axios from '../helpers/axios';
import {AxiosError} from 'axios';
import {IUser, LoginResponse} from '../types';
import {storeData} from '../helpers/async-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

type SignupProps = {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
};

export async function signupService(data: SignupProps) {
  try {
    const res = await axios.post('/users/signup', {
      ...data,
    });
    const payload: IUser = res.data;
    return {payload};
  } catch (error) {
    // TODO: make error user friendly
    return {error};
  }
}

export async function loginService(email: string, password: string) {
  try {
    const res = await axios.post('/users/login', {
      email,
      password,
    });
    const payload: LoginResponse = res.data;
    await storeData('@msa-user', JSON.stringify(payload.user));
    await storeData('@msa-access-token', payload.access_token);
    return {payload};
  } catch (error) {
    // TODO: make error user friendly
    return {error: error as AxiosError};
  }
}

export async function loadUserDetailsService() {
  try {
    debugger;
    const res = await axios.get('/users/me');
    const payload: IUser = res.data;
    return {payload};
  } catch (error) {
    // TODO: make error user friendly
    return {error};
  }
}

export async function resetPasswordDetailsService(email: string) {
  try {
    const res = await axios.post('/users/reset-password-request', {email});
    return {payload: res};
  } catch (error) {
    // TODO: make error user friendly
    return {error};
  }
}

export const logout = async () => {
  await AsyncStorage.clear();
};

// function friendlyAuthError(code: string): string {
//   switch (code.substr(5)) {
//     case 'ERROR_WRONG_PASSWORD':
//     case 'ERROR_USER_NOT_FOUND':
//     case 'user-not-found':
//     case 'wrong-password':
//       return 'Wrong email/password combination.';
//     case 'ERROR_USER_DISABLED':
//     case 'user-disabled':
//       return 'User disabled.';
//     case 'ERROR_TOO_MANY_REQUESTS':
//     case 'operation-not-allowed':
//       return 'Too many requests to log into this account.';
//     case 'ERROR_OPERATION_NOT_ALLOWED':
//     case 'operation-not-allowed':
//       return 'Server error, please try again later.';
//     case 'ERROR_INVALID_EMAIL':
//     case 'invalid-email':
//       return 'Email address is invalid.';
//     default:
//       return 'Login failed. Please try again.';
//   }
// }

export function validateEmail(email: string) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
