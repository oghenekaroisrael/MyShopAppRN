import {Div, Text, Icon} from 'react-native-magnus';
import React from 'react';
import {COLORS} from '../../constants/index';
import {formatDate} from '../../helpers/util';

export type Props = {
  id: number;
  type: string;
  title: string;
  recipient: string;
  amount: number;
  date: string;
};
const ExpenseItem: React.FC<Props> = props => {
  return (
    <Div row w={'98%'} my={5}>
      <Div flex={1} mx="sm">
        <Icon
          name={
            props.type === 'cash'
              ? 'hand-holding-usd'
              : props?.type === 'transfer'
              ? 'mobile-alt'
              : 'credit-card'
          }
          fontFamily={'FontAwesome5'}
          shadow={1}
          p={20}
          color={COLORS.badgeRed}
          bg={'white'}
          rounded={'lg'}
        />
      </Div>
      <Div flex={3}>
        <Div flexDir={'column'} py={5}>
          <Text fontSize={'xl'} fontWeight={'600'}>
            {props.title}
          </Text>
          <Text fontSize={'lg'} color={COLORS.lightGrey}>
            {props.recipient}
          </Text>
        </Div>
      </Div>
      <Div flex={2}>
        <Div
          flexDir={'column'}
          justifyContent={'flex-end'}
          alignItems={'flex-end'}>
          <Text fontSize={'xl'} color={'red500'}>
            {props.amount.toLocaleString('en-NG', {
              style: 'currency',
              currency: 'NGN',
            })}
          </Text>
          <Text fontSize={'lg'} color={COLORS.primary}>
            {formatDate(props.date)}
          </Text>
        </Div>
      </Div>
    </Div>
  );
};

export default ExpenseItem;
