import {Div, Text} from 'react-native-magnus';
import React, {useRef, useState} from 'react';
import {ActivityIndicator, Alert, FlatList, RefreshControl} from 'react-native';
import {COLORS} from '../../constants/index';
import {IExpense} from '../../types';
import ExpenseItem from './ExpenseItem';
import {fetchExpenses} from '../../services/shop';
import {storeExpenses} from '../../redux/actions/expense';
import {useDispatch} from 'react-redux';
import ListEmptyComponent from '../EmptyList/EmptyList';

export type Props = {
  data: IExpense[];
  shop?: number;
};

const ExpensesList: React.FC<Props> = ({data, shop}) => {
  const dispatch = useDispatch();
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [nonew, setnonew] = useState<boolean>(false);
  const page = useRef<number>(2); // page 2

  const loadMoreData = async () => {
    if (!loadingMore && !nonew) {
      setLoadingMore(true);
      const {payload, error} = await fetchExpenses(page.current, 10, shop);

      if (payload?.length === 0) {
        setnonew(true);
      }
      if (payload && payload.length !== 0) {
        dispatch(storeExpenses([...data, ...payload]));
        page.current++;
      } else if (error) {
        console.log(error);
        Alert.alert(
          'Error',
          'An error occured while fetching more shop Inventory',
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
          Expenses
        </Text>
      </Div>
      <Div flex={1} w={'100%'}>
        <FlatList
          data={data}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{flexGrow: 1}}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({item}) => (
            <>
              <ExpenseItem
                id={item.id}
                title={item.particular}
                amount={item.amount}
                date={item.created_at}
                recipient={item.recipient}
                type={item.payment_type}
              />
            </>
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListEmptyComponent={<ListEmptyComponent />}
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

export default ExpensesList;
