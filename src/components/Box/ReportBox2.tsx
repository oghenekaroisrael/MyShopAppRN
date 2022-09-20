import {Div, Text, Icon, Badge} from 'react-native-magnus';
import React from 'react';
import {COLORS} from '../../constants/index';

export type Props = {
  sold?: number;
  remaining?: number;
};
const ReportBox2: React.FC<Props> = (props: Props) => {
  return (
    <Div w={'100%'}>
      <Div
        bg={COLORS.white}
        my={20}
        rounded={'xl'}
        flexDir={'column'}
        mx={'10%'}
        w={'80%'}
        justifyContent={'center'}
        alignItems={'center'}>
        <Div row w={'100%'} justifyContent={'center'}>
          <Div
            flexDir={'column'}
            borderRightWidth={2}
            borderRightColor={COLORS.dark_blue}
            borderStyle={'solid'}
            justifyContent={'center'}
            alignItems={'center'}
            w={'50%'}
            p={20}>
            <Text>Sold</Text>
            <Text color={COLORS.badgeGreen} fontSize={'4xl'} fontWeight={'700'}>
              {props?.sold?.toLocaleString('en-NG', {
                style: 'currency',
                currency: 'NGN',
              })}
            </Text>
          </Div>
          <Div
            w={'50%'}
            flexDir={'column'}
            justifyContent={'center'}
            alignItems={'center'}>
            <Text>Remaining</Text>
            <Text color={COLORS.badgeRed} fontSize={'4xl'} fontWeight={'700'}>
              {props?.remaining?.toLocaleString('en-NG', {
                style: 'currency',
                currency: 'NGN',
              })}
            </Text>
          </Div>
        </Div>
      </Div>
      <Div m={10} p={20} rounded={'xl'} bg={COLORS.white}>
        <Text fontWeight={'700'} fontSize={'md'} pb={10} color={COLORS.primary}>
          Disclaimer
        </Text>
        <Text>Records Shown are from what you entered into the App.</Text>
        <Text>
          If there's anything missing, it is because you did not add those
          entries.
        </Text>
        <Text fontWeight={'700'}>Your Records Are Safe Here So Always Enter Them.</Text>
      </Div>
    </Div>
  );
};

export default ReportBox2;
