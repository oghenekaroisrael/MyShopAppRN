/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native';
import WelcomeSection from '../components/WelcomeSection/WelcomeSection';
import InventoryList from '../components/Lists/InventoryList';
import {fetchShopInventory} from '../services/shop';
import {IShopItem, IUser} from '../types';
import {COLORS} from '../constants/index';
import NewItem from '../components/Box/NewItem';
import {useDispatch, useSelector} from 'react-redux';
import {storeInventories} from '../redux/actions/inventory';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {HomeStackParams} from '../navigation/RootNavigator';
import {RootState} from '../redux/store/configureStore';

type Props = NativeStackScreenProps<HomeStackParams, 'Inventory'>;
const InventoryScreen: React.FC<Props> = (props: Props) => {
  const dispatch = useDispatch();
  const [shopStock, setShopStock] = useState<IShopItem[]>([]);

  const user = props.route?.params?.user as IUser;
  const shop = useSelector(
    (rootState: RootState) => rootState.shops.selectedShop,
  ) as number;
  const data = useSelector(
    (rootState: RootState) => rootState.inventories.inventories,
  ) as IShopItem[];

  useEffect(() => {
    const loadData = async () => {
      const {payload} = await fetchShopInventory(1, 10, shop);
      if (payload) {
        dispatch(storeInventories(payload));
        setShopStock(payload);
      }
    };
    if (data.length > 0) {
      setShopStock(data);
    } else {
      loadData();
    }
  }, [data, shop]);

  return (
    <SafeAreaView style={{backgroundColor: COLORS.dark_blue, flex: 1}}>
      <WelcomeSection name={user?.last_name + ' ' + user?.first_name} />
      <NewItem shop={'Main Shop'} type={'inventory'} />
      <InventoryList data={shopStock} shop={shop} />
    </SafeAreaView>
  );
};

export default InventoryScreen;
