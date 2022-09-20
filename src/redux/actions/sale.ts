import {ISale} from '../../types';
import {ADD_TO_SALES, REMOVE_FROM_SALES, STORE_SALES} from '../constants';

export const addToSales = (payload: ISale) => {
  return {
    type: ADD_TO_SALES,
    payload: payload,
  };
};

export const removeFromSales = (payload: number) => {
  return {
    type: REMOVE_FROM_SALES,
    payload: payload,
  };
};

export const storeSales = (payload?: ISale[]) => {
  return {
    type: STORE_SALES,
    payload: payload,
  };
};
