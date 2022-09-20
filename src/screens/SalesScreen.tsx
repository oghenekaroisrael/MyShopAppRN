/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import {Div, Text} from 'react-native-magnus';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native';
import WelcomeSection from '../components/WelcomeSection/WelcomeSection';
import {fetchSales} from '../services/shop';
import {ISale, IUser} from '../types';
import {COLORS} from '../constants/index';
import SalesList from '../components/Lists/SalesList';
import NewItem from '../components/Box/NewItem';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {HomeStackParams} from '../navigation/RootNavigator';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../redux/store/configureStore';
import { storeSales } from '../redux/actions/sale';

type Props = NativeStackScreenProps<HomeStackParams, 'Sales'>;
const SalesScreen: React.FC<Props> = (props: Props) => {
  const dispatch = useDispatch();
  const [sales, setSales] = useState<ISale[]>([]);
  const [sum, setsum] = useState<number | undefined>(0);

  const user = props.route?.params?.user as IUser;
  const shop = useSelector(
    (rootState: RootState) => rootState.shops.selectedShop,
  ) as number;
  const data = useSelector(
    (rootState: RootState) => rootState.sales.sales,
  ) as ISale[];

  useEffect(() => {
    const loadData = async () => {
      const {payload, error} = await fetchSales(1, 10, shop);
      if (payload) {
        setSales(payload);
        const total = payload?.reduce(function (result, item) {
          console.log('gets this ', result, item.selling_price);
          return result + item.selling_price;
        }, 0);
        setsum(total);
        dispatch(storeSales(payload));
      }
    };
    if (data.length > 0) {
      setSales(data);
    } else {
      loadData();
    }
  }, [data, shop]);

  return (
    <SafeAreaView style={{backgroundColor: COLORS.dark_blue, flex: 1}}>
      <WelcomeSection name={user?.last_name + ' ' + user?.first_name} />
      <NewItem amount={sum} shop={'Main Shop'} type={'sale'} />
      <SalesList data={sales} shop={shop} />
    </SafeAreaView>
  );
};

export default SalesScreen;
