import {IBank} from '../../types';
import {ADD_TO_BANKS, REMOVE_FROM_BANKS, STORE_BANKS} from '../constants';

interface IStateProps {
  banks: IBank[];
}

const initialState: IStateProps = {
  banks: [],
};

const bankReducer = (state: IStateProps = initialState, action: any) => {
  switch (action.type) {
    case STORE_BANKS:
      return {
        ...state,
        banks: action.payload,
      };
    case ADD_TO_BANKS:
      return {
        ...state,
        banks: [...state.banks, action.payload],
      };
    case REMOVE_FROM_BANKS:
      const itemsLeft = state.banks?.filter(item => {
        if (item?.id != action.payload) {
          return item;
        }
      });
      return {
        ...state,
        banks: [...itemsLeft],
      };
    default:
      return state;
  }
};
export default bankReducer;
