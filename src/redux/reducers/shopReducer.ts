import {IShop} from '../../types';
import {
  SET_SELECTED_SHOP,
  ADD_TO_SHOPS,
  REMOVE_FROM_SHOPS,
  STORE_SHOPS,
} from '../constants';

interface IStateProps {
  selectedShop: number;
  shops: IShop[];
}

const initialState: IStateProps = {
  selectedShop: 0,
  shops: [],
};

const shopReducer = (state: IStateProps = initialState, action: any) => {
  switch (action.type) {
    case SET_SELECTED_SHOP:
      return {
        ...state,
        selectedShop: action.payload,
      };
    case STORE_SHOPS:
      return {
        ...state,
        shops: action.payload,
      };
    case ADD_TO_SHOPS:
      return {
        ...state,
        shops: [...state.shops, action.payload],
      };
    case REMOVE_FROM_SHOPS:
      const itemsLeft = state.shops?.filter(item => {
        if (item?.id != action.payload) {
          return item;
        }
      });
      return {
        ...state,
        shops: [...itemsLeft],
      };
    default:
      return state;
  }
};
export default shopReducer;
