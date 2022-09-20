import {IPayout} from '../../types';
import {ADD_TO_PAYOUTS, REMOVE_FROM_PAYOUTS, STORE_PAYOUTS} from '../constants';

interface IStateProps {
  payouts: IPayout[];
}

const initialState: IStateProps = {
  payouts: [],
};

const payoutReducer = (state: IStateProps = initialState, action: any) => {
  switch (action.type) {
    case STORE_PAYOUTS:
      return {
        ...state,
        payouts: action.payload,
      };
    case ADD_TO_PAYOUTS:
      return {
        ...state,
        payouts: [...state.payouts, action.payload],
      };
    case REMOVE_FROM_PAYOUTS:
      const itemsLeft = state.payouts?.filter(item => {
        if (item?.id != action.payload) {
          return item;
        }
      });
      return {
        ...state,
        payouts: [...itemsLeft],
      };
    default:
      return state;
  }
};
export default payoutReducer;
