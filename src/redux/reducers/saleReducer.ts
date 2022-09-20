import {ISale} from '../../types';
import {ADD_TO_SALES, REMOVE_FROM_SALES, STORE_SALES} from '../constants';

interface IStateProps {
  isLoaded: boolean;
  sales: ISale[];
}

const initialState: IStateProps = {
  isLoaded: false,
  sales: [],
};

const saleReducer = (state: IStateProps = initialState, action: any) => {
  switch (action.type) {
    case STORE_SALES:
      return {
        ...state,
        isLoaded: true,
        sales: action.payload,
      };
    case ADD_TO_SALES:
      return {
        ...state,
        isLoaded: true,
        sales: [...state.sales, action.payload],
      };
    case REMOVE_FROM_SALES:
      const itemsLeft = state.sales?.filter(item => {
        if (item?.id != action.payload) {
          return item;
        }
      });
      return {
        ...state,
        isLoaded: true,
        sales: [...itemsLeft],
      };
    default:
      return state;
  }
};
export default saleReducer;
