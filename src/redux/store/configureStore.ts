import {createStore, combineReducers, applyMiddleware} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authReducer from '../reducers/authReducer';
import thunk from 'redux-thunk';
import inventoryReducer from '../reducers/inventoryReducer';
import saleReducer from '../reducers/saleReducer';
import bankReducer from '../reducers/bankReducer';
import expenseReducer from '../reducers/expenseReducer';
import payoutReducer from '../reducers/payoutReducer';
import shopReducer from '../reducers/shopReducer';

const authPersistConfig = {
  key: 'auth',
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  inventories: inventoryReducer,
  banks: bankReducer,
  expenses: expenseReducer,
  sales: saleReducer,
  payouts: payoutReducer,
  shops: shopReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);
