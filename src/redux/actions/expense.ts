import {IExpense} from '../../types';
import {
  ADD_TO_EXPENSES,
  REMOVE_FROM_EXPENSES,
  STORE_EXPENSES,
} from '../constants';

export const addToExpenses = (payload: IExpense) => {
  return {
    type: ADD_TO_EXPENSES,
    payload: payload,
  };
};

export const removeFromExpenses = (payload: number) => {
  return {
    type: REMOVE_FROM_EXPENSES,
    payload: payload,
  };
};

export const storeExpenses = (payload: IExpense[]) => {
  return {
    type: STORE_EXPENSES,
    payload: payload,
  };
};
