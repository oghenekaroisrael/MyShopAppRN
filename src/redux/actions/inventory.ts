import {IShopItem} from '../../types';
import {
  ADD_TO_INVENTORIES,
  REMOVE_FROM_INVENTORIES,
  STORE_INVENTORIES,
} from '../constants';

export const addItem = (payload: IShopItem) => {
  return {
    type: ADD_TO_INVENTORIES,
    payload: payload,
  };
};

export const removeFromInventories = (payload: number) => {
  return {
    type: REMOVE_FROM_INVENTORIES,
    payload: payload,
  };
};

export const storeInventories = (payload?: IShopItem[]) => {
  return {
    type: STORE_INVENTORIES,
    payload: payload,
  };
};
