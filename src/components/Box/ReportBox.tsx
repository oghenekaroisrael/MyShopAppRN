import {Div, Text, Badge} from 'react-native-magnus';
import React from 'react';
import {COLORS} from '../../constants/index';

export type Props = {
  profit?: number;
  sales?: number;
  expenses?: number;
  payouts?: number;
  shops?: number;
};
const ReportBox: React.FC<Props> = (props: Props) => {
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
      <Div row w={'100%'} justifyContent={'space-between'} mb={20}>
        <Div
          flexDir={'column'}
          justifyContent={'center'}
          alignItems={'flex-start'}
          borderLeftWidth={10}
          borderLeftColor={COLORS.dark_blue}
          pl={10}
          pb={10}>
          <Text fontWeight={'700'} fontSize={'6xl'} color={'white'}>
            {props?.profit?.toLocaleString('en-NG', {
              style: 'currency',
              currency: 'NGN',
            })}
          </Text>
          <Text fontWeight={'400'} fontSize={'lg'} mb={5} color={'white'}>
            Profit For This Month
          </Text>
        </Div>
        <Div
          flexDir={'column'}
          justifyContent={'space-between'}
          alignItems={'center'}>
          <Text color={COLORS.white}>You Have</Text>
          <Badge bg={COLORS.secondary}>{props?.shops?.toString()}</Badge>
          <Text color={COLORS.white}>Shop(s) Now</Text>
        </Div>
      </Div>

      <Div
        flexDir={'column'}
        w={'100%'}
        py={10}
        justifyContent={'space-between'}
        alignItems={'center'}>
        <Div
          row
          justifyContent={'space-between'}
          alignItems={'center'}
          w={'100%'}
          borderBottomWidth={1}
          borderBottomColor={COLORS.white}
          pb={5}>
          <Text color={COLORS.white} fontSize={'xl'}>
            Transactions
          </Text>
          <Text color={COLORS.white} fontSize={'xl'}>
            Total Amount
          </Text>
        </Div>
        <Div
          row
          justifyContent={'space-between'}
          alignItems={'center'}
          w={'100%'}
          py={10}>
          <Text color={COLORS.white}>Sales</Text>
          <Text color={COLORS.white}>{props.sales}</Text>
        </Div>
        <Div
          row
          justifyContent={'space-between'}
          alignItems={'center'}
          w={'100%'}
          py={10}>
          <Text color={COLORS.white}>Expenses</Text>
          <Text color={COLORS.white}>{props.expenses}</Text>
        </Div>
        <Div
          row
          justifyContent={'space-between'}
          alignItems={'center'}
          w={'100%'}
          py={10}>
          <Text color={COLORS.white}>Payouts</Text>
          <Text color={COLORS.white}>{props.payouts}</Text>
        </Div>
      </Div>
    </Div>
  );
};

export default ReportBox;
