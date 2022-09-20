/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import {Div, Text} from 'react-native-magnus';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native';
import WelcomeSection from '../components/WelcomeSection/WelcomeSection';
import {fetchPayouts} from '../services/shop';
import {IPayout, IShopItem, IUser} from '../types';
import {COLORS} from '../constants/index';
import PayoutsList from '../components/Lists/PayoutsList';
import NewItem from '../components/Box/NewItem';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {HomeStackParams} from '../navigation/RootNavigator';
import {useDispatch, useSelector} from 'react-redux';
import {storePayouts} from '../redux/actions/payout';
import {RootState} from '../redux/store/configureStore';

type Props = NativeStackScreenProps<HomeStackParams, 'Payouts'>;
const PayoutScreen: React.FC<Props> = (props: Props) => {
  const dispatch = useDispatch();
  const [payouts, setPayouts] = useState<IPayout[]>([]);
  const [isloaded, setisloaded] = useState<boolean>(false);
  const [sum, setsum] = useState<number | undefined>(0);
  const user = props.route?.params?.user as IUser;

  const shop = useSelector(
    (rootState: RootState) => rootState.shops.selectedShop,
  ) as number;
  const data = useSelector(
    (rootState: RootState) => rootState.payouts.payouts,
  ) as IPayout[];

  useEffect(() => {
    const loadData = async () => {
      const {payload, error} = await fetchPayouts(1, 10, shop);
      if (payload) {
        setPayouts(payload);
        const total = payouts?.reduce(function (result, item) {
          return result + item.amount;
        }, 0);
        setsum(total);
        dispatch(storePayouts(payload));
      }
    };
    if (data.length > 0) {
      setPayouts(data);
    } else {
      loadData();
    }
  }, [data, shop]);

  return (
    <SafeAreaView style={{backgroundColor: COLORS.dark_blue, flex: 1}}>
      <WelcomeSection name={user?.last_name + ' ' + user?.first_name} />
      <NewItem amount={sum} shop={'Main Shop'} type={'payout'} />
      <PayoutsList data={payouts} shop={shop} />
    </SafeAreaView>
  );
};

export default PayoutScreen;
