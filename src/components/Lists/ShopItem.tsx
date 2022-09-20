import {Div, Text, Icon} from 'react-native-magnus';
import React from 'react';
import {COLORS} from '../../constants/index';

export type Props = {
  id: number;
  status: string;
  cost: number;
  title: string;
  amount: number;
  date: string;
  quantity: number;
  shop_id: number;
};

const ShopItem: React.FC<Props> = props => {
  return (
    <Div row w={'98%'} my={5}>
      <Div flex={1} mx="sm" justifyContent={'center'} alignItems={'center'}>
        <Icon
          name={'dolly'}
          fontFamily={'FontAwesome5'}
          color={COLORS.badgeGreen}
          fontSize={'2xl'}
          shadow={1}
          p={20}
          bg={'white'}
          rounded={'lg'}
        />
      </Div>
      <Div flex={3}>
        <Div flexDir={'column'} py={10}>
          <Text
            fontSize={'xl'}
            fontWeight={'600'}
            py={5}
            color={COLORS.primary}>
            {props.title}
          </Text>
          <Text fontSize={'lg'} color={COLORS.lightGrey} py={5}>
            Cost Price: {props.cost}
          </Text>
          <Text fontSize={'lg'} color={COLORS.lightGrey} py={5}>
            Selling Price: {props.amount}
          </Text>
        </Div>
      </Div>
      <Div flex={2}>
        <Div
          flexDir={'column'}
          justifyContent={'center'}
          alignItems={'flex-end'}
          py={10}>
          <Text fontSize={'xl'} py={5}>
            Quantity
          </Text>
          <Text fontSize={'lg'} py={5} color={COLORS.primary}>
            {props.quantity}
          </Text>
        </Div>
      </Div>
    </Div>
  );
};

export default ShopItem;
