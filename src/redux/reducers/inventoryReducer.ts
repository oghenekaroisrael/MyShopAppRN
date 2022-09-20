import {IShopItem} from '../../types';
import {
  ADD_TO_INVENTORIES,
  REMOVE_FROM_INVENTORIES,
  STORE_INVENTORIES,
} from '../constants';

interface IStateProps {
  isLoaded: boolean;
  inventories: IShopItem[];
}

const initialState: IStateProps = {
  isLoaded: true,
  inventories: [],
};

const inventoryReducer = (state: IStateProps = initialState, action: any) => {
  switch (action.type) {
    case STORE_INVENTORIES:
      return {
        ...state,
        isLoaded: true,
        inventories: action.payload,
      };
    case ADD_TO_INVENTORIES:
      return {
        ...state,
        isLoaded: true,
        inventories: [...state.inventories, action.payload],
      };
    case REMOVE_FROM_INVENTORIES:
      const itemsLeft = state.inventories?.filter(item => {
        if (item?.id != action.payload) {
          return item;
        }
      });
      return {
        ...state,
        isLoaded: true,
        inventories: [...itemsLeft],
      };
    default:
      return state;
  }
};
export default inventoryReducer;
