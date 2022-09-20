/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Div,
  Text,
  Icon,
  Button,
  Modal,
  Select,
  Input,
  DropdownRef,
} from 'react-native-magnus';
import React, {useEffect, useRef, useState} from 'react';
import {COLORS} from '../../constants/index';
import {IBankRequest, ILogoBank} from '../../types';
import {Alert, TouchableOpacity} from 'react-native';
import {bankLists, createBank} from '../../services/shop';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/store/configureStore';
import {addToBanks} from '../../redux/actions/bank';

const bankInitialState: IBankRequest = {
  icon: '',
  bank_name: '',
  account_number: '',
  shop_id: 0,
};

const NewBank: React.FC = () => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState<boolean>(false);
  const [state, setState] = useState<IBankRequest>(bankInitialState);
  const [banks, setBanks] = useState<ILogoBank[]>([]);
  const dropdownBankRef = useRef<DropdownRef>(null);
  var selectedBank: string | undefined = '';

  const selectedShop = useSelector((rootState: RootState) => {
    rootState.shops.selectedShop;
  }) as unknown as number;

  useEffect(() => {
    const loadLogoBanks = async () => {
      const {payload, error} = await bankLists();
      if (payload) {
        setBanks(payload);
      }
    };

    loadLogoBanks();
  }, []);

  selectedBank = banks.find(item => item.name === state.bank_name)?.name;

  const onSelectAreaOption = (name: string) => {
    const logo: string | undefined = banks.find(
      item => item.name === name,
    )?.logo;
    console.warn(name, logo, selectedShop);
    setState({
      ...state,
      bank_name: name,
      icon: logo,
      shop_id: selectedShop || 1,
    });
  };

  var formCompleted = false;

  const handleComplete = async () => {
    formCompleted = Object.values(state).every(x => Boolean(x));
    if (formCompleted) {
      const {payload, error} = await createBank(state);
      if (payload) {
        dispatch(addToBanks(payload));
        setVisible(false);
        setState(bankInitialState);
      } else if (error) {
        Alert.alert(
          'Error',
          'An Occured While Retrieving Banks From Our End, Kindly Check Back Later Or Try Again With Stronger Network',
        );
      }
    } else {
      Alert.alert('Error', 'Form Incomplete');
    }
  };

  return (
    <Div
      p={10}
      my={20}
      rounded={'xl'}
      flexDir={'column'}
      mx={10}
      justifyContent={'space-between'}
      alignItems={'center'}>
      <Div
        row
        w={'100%'}
        py={10}
        justifyContent={'flex-end'}
        alignItems={'center'}>
        <Button
          bg={COLORS.secondary}
          rounded="circle"
          onPress={() => setVisible(true)}>
          <Icon
            name="bank-plus"
            fontFamily={'MaterialCommunityIcons'}
            fontSize={'4xl'}
            color={COLORS.white}
            px={10}
          />
          <Text fontSize={'2xl'} color={COLORS.dark_blue} px={10}>
            Add New Bank
          </Text>
        </Button>
        <Modal isVisible={visible}>
          <Button
            bg="gray400"
            h={35}
            w={35}
            position="absolute"
            top={50}
            right={15}
            rounded="circle"
            onPress={() => {
              setVisible(false);
            }}>
            <Icon color="black900" name="close" />
          </Button>
          <Div mt={50} px={20}>
            <Div
              flexDir={'column'}
              justifyContent={'center'}
              alignItems={'center'}
              mb={20}>
              <Icon
                name={'post-add'}
                fontFamily={'MaterialIcons'}
                fontSize={'4xl'}
                color={COLORS.secondary}
              />
              <Text fontSize={'2xl'} fontFamily={'DMSans-Bold'}>
                Add New Bank Detail
              </Text>
              <Div w={100} bg={COLORS.primary} h={2} my={20} />
            </Div>
            <Div>
              <Div mb={16}>
                <Text mb={8} fontWeight="bold">
                  Account Number <Text color="red">*</Text>
                </Text>
                <Input
                  bg="#F5F5F5"
                  borderWidth={1}
                  keyboardType="ascii-capable"
                  borderColor="#CBCBCB"
                  rounded="sm"
                  returnKeyType="next"
                  focusBorderColor="blue700"
                  placeholder="Bank Account Number"
                  value={state.account_number}
                  onChangeText={text =>
                    setState({...state, account_number: text})
                  }
                />
              </Div>
              <Div row mb={36}>
                <Div flex={1} mx={4}>
                  <Text mb={8} fontWeight="bold">
                    Status <Text color="red">*</Text>
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      if (dropdownBankRef.current) {
                        dropdownBankRef.current.open();
                      }
                    }}
                    style={{
                      borderRadius: 4,
                      backgroundColor: '#F5F5F5',
                      borderWidth: 1,
                      borderColor: '#CBCBCB',
                      paddingVertical: 16,
                      paddingHorizontal: 12,
                      justifyContent: 'center',
                    }}>
                    {selectedBank ? (
                      <Text>{selectedBank}</Text>
                    ) : (
                      <Text color="rgba(79, 86, 98, 0.9)">Select</Text>
                    )}
                  </TouchableOpacity>
                </Div>
                <Select
                  onSelect={name => onSelectAreaOption(name)}
                  ref={dropdownBankRef}
                  value={state.bank_name}
                  title="Choose Bank"
                  mt="md"
                  pb="2xl"
                  roundedTop="xl"
                  data={banks}
                  renderItem={item => (
                    <Select.Option value={item.name} py="md" px="xl">
                      <Text>{item.name}</Text>
                    </Select.Option>
                  )}
                />
              </Div>
              <Div row mb={16}>
                <Button
                  w={'100%'}
                  bg={COLORS.dark_blue}
                  onPress={() => handleComplete()}>
                  Add Item
                </Button>
              </Div>
            </Div>
          </Div>
        </Modal>
      </Div>
    </Div>
  );
};

export default NewBank;
