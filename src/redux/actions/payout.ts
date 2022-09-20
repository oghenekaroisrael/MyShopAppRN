import {IPayout} from '../../types';
import {ADD_TO_PAYOUTS, REMOVE_FROM_PAYOUTS, STORE_PAYOUTS} from '../constants';

export const addToPayouts = (payload: IPayout) => {
  return {
    type: ADD_TO_PAYOUTS,
    payload: payload,
  };
};

export const removeFromPayouts = (payload: number) => {
  return {
    type: REMOVE_FROM_PAYOUTS,
    payload: payload,
  };
};

export const storePayouts = (payload: IPayout[]) => {
  return {
    type: STORE_PAYOUTS,
    payload: payload,
  };
};
