import {IBank} from '../../types';
import {ADD_TO_BANKS, REMOVE_FROM_BANKS, STORE_BANKS} from '../constants';

export const addToBanks = (payload: IBank) => {
  return {
    type: ADD_TO_BANKS,
    payload: payload,
  };
};

export const removeFromBanks = (payload: number) => {
  return {
    type: REMOVE_FROM_BANKS,
    payload: payload,
  };
};

export const storeBanks = (payload: IBank[]) => {
  return {
    type: STORE_BANKS,
    payload: payload,
  };
};
