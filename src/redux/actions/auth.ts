import {LOGIN, STORE_USER_DETAILS, LOGOUT} from '../constants';
import {IUser, LoginResponse} from '../../types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {store} from '../store/configureStore';

export const login = (payload: LoginResponse) => {
  return {
    type: LOGIN,
    payload,
  };
};

export const storeUserDetails = (payload: IUser) => {
  return {
    type: STORE_USER_DETAILS,
    payload: payload,
  };
};

export const logout = () => {
  AsyncStorage.removeItem('@msa-user');
  AsyncStorage.removeItem('@msa-access-token');
  store.dispatch({type: LOGOUT});
};
