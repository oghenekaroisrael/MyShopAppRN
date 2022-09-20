/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import {Div, Text} from 'react-native-magnus';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native';
import WelcomeSection from '../components/WelcomeSection/WelcomeSection';
import {fetchExpenses} from '../services/shop';
import {IExpense, IShopItem, IUser} from '../types';
import {COLORS} from '../constants/index';
import ExpensesList from '../components/Lists/ExpensesList';
import NewItem from '../components/Box/NewItem';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {HomeStackParams} from '../navigation/RootNavigator';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../redux/store/configureStore';
import { storeExpenses } from '../redux/actions/expense';

type Props = NativeStackScreenProps<HomeStackParams, 'Expenses'>;
const ExpensesScreen: React.FC<Props> = (props: Props) => {
  const dispatch = useDispatch();
  const [expenses, setExpenses] = useState<IExpense[]>([]);
  const [isloaded, setisloaded] = useState<boolean>(false);
  const [sum, setsum] = useState<number | undefined>(0);
  const user = props.route?.params?.user as IUser;

  const shop = useSelector(
    (rootState: RootState) => rootState.shops.selectedShop,
  ) as number;

  const data = useSelector(
    (rootState: RootState) => rootState.expenses.expenses,
  ) as IExpense[];

  useEffect(() => {
    const loadData = async () => {
      const {payload, error} = await fetchExpenses(1, 10, shop);
      if (payload) {
        setExpenses(payload);
        const total = expenses?.reduce(function (result, item) {
          return result + item.amount;
        }, 0);
        setsum(total);
        dispatch(storeExpenses(payload));
      }
    };

    if (data.length > 0) {
      setExpenses(data);
    } else {
      loadData();
    }
  }, []);

  return (
    <SafeAreaView style={{backgroundColor: COLORS.dark_blue, flex: 1}}>
      <WelcomeSection name={user?.last_name + ' ' + user?.first_name} />
      <NewItem amount={sum} shop={'Main Shop'} type={'expense'} />
      <ExpensesList data={expenses} shop={shop} />
    </SafeAreaView>
  );
};

export default ExpensesScreen;
