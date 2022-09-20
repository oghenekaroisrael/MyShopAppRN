import {Div, Text, Image, Icon, Button} from 'react-native-magnus';
import React from 'react';
import {COLORS} from '../../constants/index';
import {useDispatch} from 'react-redux';
import {removeFromBanks} from '../../redux/actions/bank';
import { Alert } from 'react-native';
import { deleteBank } from '../../services/shop';

export type Props = {
  icon?: string;
  name?: string;
  number?: string;
  id?: number;
};

const BankItem: React.FC<Props> = props => {
  const dispatch = useDispatch();
  const removeBank = async (id?: number) => {
    const {payload, error} = await deleteBank(id);
    if (payload) {
      dispatch(removeFromBanks(id));
    } else {
      Alert.alert('Error', error);
    }
  };

  return (
    <Div
      row
      w={'98%'}
      my={5}
      borderColor={COLORS.dark_blue}
      borderWidth={1}
      rounded={'2xl'}
      p={10}>
      <Div
        flex={1}
        mx="sm"
        justifyContent={'center'}
        alignItems={'center'}
        p={5}
        rounded={'2xl'}
        bg={COLORS.white}>
        <Image
          source={{
            uri: props?.icon,
          }}
          shadow={1}
          h={50}
          w={50}
        />
      </Div>
      <Div flex={3}>
        <Div
          flexDir={'column'}
          py={10}
          justifyContent={'center'}
          alignItems={'flex-start'}>
          <Text
            fontSize={'xl'}
            fontWeight={'600'}
            py={5}
            color={COLORS.secondary}>
            {props?.name}
          </Text>
          <Text fontSize={'lg'} color={COLORS.lightGrey} py={5}>
            {props?.number}
          </Text>
        </Div>
      </Div>
      <Div flex={1} justifyContent={'center'} alignItems={'center'}>
        <Button onPress={() => removeBank(props?.id)} bg={COLORS.dark_blue}>
          <Icon
            name={'trash'}
            color={COLORS.white}
            fontFamily={'Octicons'}
            fontSize={'4xl'}
          />
        </Button>
      </Div>
    </Div>
  );
};

export default BankItem;
