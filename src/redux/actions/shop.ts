import {IShop} from '../../types';
import {
  ADD_TO_SHOPS,
  REMOVE_FROM_SHOPS,
  SET_SELECTED_SHOP,
  STORE_SHOPS,
} from '../constants';

export const addToShops = (payload: IShop) => {
  return {
    type: ADD_TO_SHOPS,
    payload: payload,
  };
};

export const removeFromShops = (payload: number) => {
  return {
    type: REMOVE_FROM_SHOPS,
    payload: payload,
  };
};

export const storeShops = (payload?: IShop[]) => {
  return {
    type: STORE_SHOPS,
    payload: payload,
  };
};

export const setSelectedShop = (payload: number) => {
  return {
    type: SET_SELECTED_SHOP,
    payload: payload,
  };
};
