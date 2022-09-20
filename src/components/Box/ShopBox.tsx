/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import {Div, Text, DropdownRef, Select, Icon} from 'react-native-magnus';
import React, {useEffect, useRef, useState} from 'react';
import BoxItem from './BoxItem';
import {COLORS} from '../../constants/index';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/store/configureStore';
import {IShop} from '../../types';
import {TouchableOpacity} from 'react-native';
import {fetchShops} from '../../services/shop';
import {setSelectedShop, storeShops} from '../../redux/actions/shop';

export type Props = {
  count: number;
  action: any;
  user: number;
};
const ShopBox: React.FC<Props> = (props: Props) => {
  const dispatch = useDispatch();
  const dropdownShopRef = useRef<DropdownRef>(null);
  const [shops, setShops] = useState<IShop[]>([]);
  const [shop, setShop] = useState<number>(0);
  const defaultShop = useSelector(
    (rs: RootState) => rs.shops.selectedShop,
  ) as number;

  const selectedShop: string | undefined = shops.find(
    item => item.id === shop,
  )?.shop_name;

  useEffect(() => {
    const loadData = async () => {
      const {payload} = await fetchShops(1, 10, props.user);
      if (payload) {
        setShops(payload);
        dispatch(storeShops(shops));
      }
    };

    const getDefault = async () => {
      if (
        defaultShop === undefined ||
        defaultShop === null ||
        defaultShop === 0
      ) {
        const {payload} = await fetchShops(1, 10, props.user);
        if (payload) {
          dispatch(setSelectedShop(payload[0].id));
          setShop(payload[0].id);
        }
      }
    };
    getDefault();
    loadData();
  }, [props.user]);

  const onSelectAreaOption = (v: number) => {
    setShop(v);
    dispatch(setSelectedShop(v));
  };

  // setShop(
  //   useSelector(
  //     (rootState: RootState) => rootState.shops.selectedShop,
  //   ) as number,
  // );

  return (
    <Div
      bg={COLORS.primary}
      p={10}
      my={20}
      rounded={'xl'}
      flexDir={'column'}
      mx={10}
      justifyContent={'space-between'}
      alignItems={'center'}>
      <Div flexDir={'column'} justifyContent={'center'} alignItems={'center'}>
        <Text fontWeight={'400'} fontSize={16} mb={5} color={'white'}>
          Total Shops
        </Text>
        <Text fontWeight={'700'} fontSize={72} color={'white'}>
          {props.count}
        </Text>
        <Div row mb={16}>
          <Div
            flex={1}
            mx={4}
            justifyContent={'center'}
            alignItems={'center'}
            w={'100%'}>
            <Text mb={2} fontWeight="bold" fontSize={'xl'}>
              Select Shop To View
            </Text>
            <Icon
              name={'down'}
              fontFamily={'AntDesign'}
              fontSize={'xl'}
              color={COLORS.white}
              mb={5}
            />
            <TouchableOpacity
              onPress={() => {
                if (dropdownShopRef.current) {
                  dropdownShopRef.current.open();
                }
              }}
              style={{
                borderRadius: 20,
                backgroundColor: '#F5F5F5',
                borderWidth: 1,
                borderColor: '#CBCBCB',
                paddingVertical: 5,
                paddingHorizontal: 12,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {selectedShop ? (
                <Text>{selectedShop}</Text>
              ) : (
                <Text color="rgba(79, 86, 98, 0.9)">Select</Text>
              )}
            </TouchableOpacity>
          </Div>
          <Select
            onSelect={v => onSelectAreaOption(Number(v))}
            ref={dropdownShopRef}
            value={shop}
            title="Choose Shop"
            mt="md"
            pb="2xl"
            roundedTop="xl"
            data={shops}
            renderItem={item => (
              <Select.Option value={item.id} py="md" px="xl">
                <Text>{item.shop_name}</Text>
              </Select.Option>
            )}
          />
        </Div>
      </Div>
      <Div
        row
        w={'100%'}
        py={10}
        justifyContent={'space-between'}
        alignItems={'center'}
        borderTopWidth={1}
        borderTopColor={'white'}>
        <BoxItem text={'Inventory'} action={() => props.action('Inventory')} />
        <BoxItem text={'Sales'} action={() => props.action('Sales')} />
        <BoxItem text={'Expenses'} action={() => props.action('Expenses')} />
        <BoxItem text={'Payouts'} action={() => props.action('Payouts')} />
      </Div>
    </Div>
  );
};

export default ShopBox;
