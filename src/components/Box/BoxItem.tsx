import {Div, Text, Icon} from 'react-native-magnus';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {COLORS} from '../../constants/index';

export type Props = {
  action: any;
  text: string;
};
const BoxItem: React.FC<Props> = ({text, action}) => {
  return (
    <TouchableOpacity onPress={action}>
      <Div flexDir={'column'} justifyContent={'center'} alignItems={'center'}>
        <Icon
          bg="yellow400"
          p={20}
          rounded="circle"
          name={
            text == 'Inventory'
              ? 'boxes'
              : text == 'Sales'
              ? 'shopping-basket'
              : text == 'Expenses'
              ? 'money-bill'
              : 'users'
          }
          color="yellow700"
          fontSize="xl"
          fontFamily="FontAwesome5"
        />
        <Text color={COLORS.white} fontSize={14} mt={5}>
          {text}
        </Text>
      </Div>
    </TouchableOpacity>
  );
};

export default BoxItem;
