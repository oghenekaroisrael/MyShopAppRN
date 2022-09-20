/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
// import {Div, Text} from 'react-native-magnus';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native';
import WelcomeSection from '../components/WelcomeSection/WelcomeSection';
import {countShops, fetchSalesHistory} from '../services/shop';
import {ISale, IUser} from '../types';
import {COLORS} from '../constants/index';
import SalesList from '../components/Lists/SalesList';
import ReportBox from '../components/Box/ReportBox';
import ReportBox2 from '../components/Box/ReportBox2';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {HomeStackParams, RootStackParamList} from '../navigation/RootNavigator';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store/configureStore';

// type Props = NativeStackScreenProps<HomeStackParams, 'Reports'>;
const ReportsScreen: React.FC = (props: any) => {
  const [Shops, setShops] = useState<number>(0);
  const [salesHistory, setSalesHistory] = useState<ISale[] | undefined>([]);
  const [isloaded, setisloaded] = useState<boolean>(false);
  const user = useSelector((rs: RootState) => rs.auth.user) as unknown as IUser;
  const shop = useSelector(
    (rootState: RootState) => rootState.shops.selectedShop,
  ) as number;

  useEffect(() => {
    const fetchCountData = async () => {
      const {payload, error} = await countShops(user?.id);
      if (!error && payload?.count > 0) {
        setShops(payload?.count);
      }
    };
    const fetchSales = async () => {
      const {payload, error} = await fetchSalesHistory(1, 10, shop);
      setSalesHistory(payload);
    };
    fetchCountData();
    fetchSales();
  }, []);

  const _goToOtherScreens = (screen: string) => {
    props.navigation.navigate(screen);
  };

  return (
    <SafeAreaView style={{backgroundColor: COLORS.dark_blue, flex: 1}}>
    <WelcomeSection name={user?.last_name + ' ' + user?.first_name} />
      <ReportBox shops={Shops} sales={0} profit={0} expenses={0} payouts={0} />
      <ReportBox2 sold={0} remaining={0} />
    </SafeAreaView>
  );
};

export default ReportsScreen;
