import {IExpense} from '../../types';
import {
  ADD_TO_EXPENSES,
  REMOVE_FROM_EXPENSES,
  STORE_EXPENSES,
} from '../constants';

interface IStateProps {
  expenses: IExpense[];
}

const initialState: IStateProps = {
  expenses: [],
};

const expenseReducer = (state: IStateProps = initialState, action: any) => {
  switch (action.type) {
    case STORE_EXPENSES:
      return {
        ...state,
        expenses: action.payload,
      };
    case ADD_TO_EXPENSES:
      return {
        ...state,
        expenses: [...state.expenses, action.payload],
      };
    case REMOVE_FROM_EXPENSES:
      const itemsLeft = state.expenses?.filter(item => {
        if (item?.id != action.payload) {
          return item;
        }
      });
      return {
        ...state,
        expenses: [...itemsLeft],
      };
    default:
      return state;
  }
};
export default expenseReducer;
