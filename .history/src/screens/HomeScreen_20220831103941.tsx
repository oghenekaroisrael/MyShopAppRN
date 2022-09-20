/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
// import {Div, Text} from 'react-native-magnus';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native';
import WelcomeSection from '../components/WelcomeSection/WelcomeSection';
import ShopBox from '../components/Box/ShopBox';
import {countShops, fetchSalesHistory} from '../services/shop';
import {ISale, IUser} from '../types';
import {COLORS} from '../constants/index';
import SalesList from '../components/Lists/SalesList';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../redux/store/configureStore';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {HomeStackParams, RootStackParamList} from '../navigation/RootNavigator';

type Props = NativeStackScreenProps<HomeStackParams, 'Home'>;
const HomeScreen: React.FC<Props> = (props: Props) => {
  const [Shops, setShops] = useState<number>(0);
  const [salesHistory, setSalesHistory] = useState<ISale[]>([]);
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
  }, [user]);

  const _goToOtherScreens = (screen: any) => {
    props.navigation.navigate(screen, {user: user});
  };

  return (
    <SafeAreaView style={{backgroundColor: COLORS.dark_blue, flex: 1}}>
      <WelcomeSection name={user?.last_name + ' ' + user?.first_name} />
      <ShopBox count={Shops} action={_goToOtherScreens} user={user?.id} />
      <SalesList data={salesHistory} shop={shop} />
    </SafeAreaView>
  );
};

export default HomeScreen;
