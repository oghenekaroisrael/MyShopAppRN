/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import {Div, Text} from 'react-native-magnus';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native';
import WelcomeSection from '../components/WelcomeSection/WelcomeSection';
import BankList from '../components/Lists/BankList';
import {fetchBanks} from '../services/shop';
import {IBank, IUser} from '../types';
import {COLORS} from '../constants/index';
import NewItem from '../components/Box/NewItem';
import {useDispatch, useSelector} from 'react-redux';
import {storeBanks} from '../redux/actions/bank';
import NewBank from '../components/Box/NewBank';
import {RootState} from '../redux/store/configureStore';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {HomeStackParams} from '../navigation/RootNavigator';

type Props = NativeStackScreenProps<HomeStackParams, 'Banks'>;
const BankScreen: React.FC<Props> = (props: Props) => {
  const dispatch = useDispatch();
  const user = useSelector(
    (rootState: RootState) => rootState.auth.user,
  ) as unknown as IUser;
  const [banks, setBanks] = useState<IBank[]>([]);
  const shop = useSelector(
    (rootState: RootState) => rootState.shops.selectedShop,
  ) as number;
  const data = useSelector(
    (rootState: RootState) => rootState.banks.banks,
  ) as IBank[];

  useEffect(() => {
    const loadBanks = async () => {
      const {payload, error} = await fetchBanks(1, 10, shop);
      if (payload) {
        dispatch(storeBanks(payload));
        setBanks(payload);
      }
    };

    if (data.length > 0) {
      setBanks(data);
    } else {
      loadBanks();
    }
  }, [shop, data]);

  return (
    <SafeAreaView style={{backgroundColor: COLORS.dark_blue, flex: 1}}>
      <WelcomeSection name={user?.last_name + ' ' + user?.first_name} />
      <NewBank />
      <BankList data={banks} shop_id={shop} />
    </SafeAreaView>
  );
};

export default BankScreen;
