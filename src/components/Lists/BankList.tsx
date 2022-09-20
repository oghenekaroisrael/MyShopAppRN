/* eslint-disable react/jsx-no-duplicate-props */
import {Div, Image, Text} from 'react-native-magnus';
import React, {useRef, useState} from 'react';
import {ActivityIndicator, Alert, FlatList, RefreshControl} from 'react-native';
import BankItem from './BankItem';
import {COLORS, images} from '../../constants/index';
import {IBank} from '../../types';
import {fetchBanks} from '../../services/shop';
import {useDispatch} from 'react-redux';
import {storeBanks} from '../../redux/actions/bank';
import {View} from 'react-native-animatable';

export type Props = {
  data: IBank[];
  shop_id?: number | undefined;
};

const BankList: React.FC<Props> = ({data, shop_id}) => {
  const dispatch = useDispatch();
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [nonew, setnonew] = useState<boolean>(false);
  const page = useRef<number>(2); // page 2

  const loadMoreData = async () => {
    if (!loadingMore && !nonew) {
      setLoadingMore(true);
      const {payload, error} = await fetchBanks(page.current, 10, shop_id);
      if (payload?.length === 0) {
        setnonew(true);
      }
      if (payload && payload.length > 0) {
        dispatch(storeBanks([...data, ...payload]));
        page.current++;
      } else if (error) {
        console.log(error);
        Alert.alert(
          'Error',
          'An error occured while fetching more completed deliveries',
        );
      }
      setLoadingMore(false);
    }
  };

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    page.current = 2;
    setTimeout(() => setRefreshing(false), 1000);
  }, []);

  return (
    <Div
      bg={COLORS.listBg}
      p={10}
      my={20}
      rounded={'xl'}
      flexDir={'column'}
      h={'100%'}
      justifyContent={'space-between'}
      alignItems={'center'}>
      <Div flexDir={'column'} justifyContent={'center'} alignItems={'center'}>
        <Text
          fontWeight={'700'}
          fontSize={18}
          py={10}
          mb={5}
          color={COLORS.black}>
          Banks
        </Text>
      </Div>
      <Div flex={1} w={'100%'}>
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{flexGrow: 1}}
          data={data}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({item}) => (
            <>
              <BankItem
                id={item.id}
                icon={item.icon}
                name={item.bank_name}
                number={item.account_number}
              />
            </>
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListEmptyComponent={ListEmptyComponent}
          ListFooterComponent={
            loadingMore ? (
              <Div mb={400}>
                <ActivityIndicator />
              </Div>
            ) : (
              <Div mb={400} />
            )
          }
          onEndReachedThreshold={0.4}
          onEndReached={!loadingMore ? loadMoreData : null}
        />
      </Div>
    </Div>
  );
};

function ListEmptyComponent() {
  return (
    <View
      animation={'swing'}
      easing={'ease'}
      duration={5000}
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        marginBottom: 150,
      }}>
      <Image h={226} w={219} rounded="circle" source={images.no_items} />
      <Text fontWeight="bold" fontSize={'xl'} pt={20}>
        Nothing Available Right Now.
      </Text>
    </View>
  );
}

export default BankList;
