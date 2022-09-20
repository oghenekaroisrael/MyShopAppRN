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
import {IExpense, IExpenseRequest, INewShopItem, ISale, ISaleRequest, IShopItem} from '../../types';
import {Alert, TouchableOpacity} from 'react-native';
import {createInventory, createSale} from '../../services/shop';
import {useDispatch, useSelector} from 'react-redux';
import {addItem} from '../../redux/actions/inventory';
import {addToSales} from '../../redux/actions/sale';
import {RootState} from '../../redux/store/configureStore';

export type Props = {
  amount?: number;
  shop: string;
  type?: string;
};

const inventoryInitialState: INewShopItem = {
  item_name: '',
  quantity: '',
  cost_price: '',
  selling_price_standard: '',
  payment_type: '',
  status: '',
  shop_id: 1,
};

const saleInitialState: ISaleRequest = {
  item_name: '',
  item_id: 0,
  quantity: 0,
  selling_price: 0,
  payment_type: '',
  shop_id: 1,
};

const expenseInitialState: IExpenseRequest = {
  particular: '',
  recipient: '',
  amount: 0,
  payment_type: '',
  shop_id: 1,
};

const statusOptions = [
  {label: 'Available', value: 'available'},
  {label: 'Unavailable', value: 'unavailable'},
  {label: 'Arriving Soon', value: 'arriving soon'},
];

const paymentOptions = [
  {label: 'Cash', value: 'cash'},
  {label: 'Bank Transfer', value: 'bank transfer'},
  {label: 'Others', value: 'others'},
];

const NewItem: React.FC<Props> = (props: Props) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState<boolean>(false);
  const [state, setState] = useState<INewShopItem>(inventoryInitialState);
  const [saleState, setSaleState] = useState<ISaleRequest>(saleInitialState);
  const dropdownSizeRef = useRef<DropdownRef>(null);
  const dropdownItemRef = useRef<DropdownRef>(null);
  const dropdownTypeRef = useRef<DropdownRef>(null);
  var selectedItem: string | undefined = '';
  var selectedType: string | undefined = '';
  var selectedStatus: string | undefined = '';

  const inventories = useSelector(
    (rootState: RootState) => rootState.inventories.inventories,
  ) as unknown as IShopItem[];

  useEffect(() => {
    const getSelectData = () => {
      selectedStatus = statusOptions.find(
        status => status.value === state.status,
      )?.label;

      selectedType = paymentOptions.find(
        type => type.value === saleState.payment_type,
      )?.label;

      selectedItem = inventories.find(
        item => item.id === saleState.item_id,
      )?.item_name;
    };

    getSelectData();
  }, [
    inventories,
    saleState.item_id,
    saleState.item_name,
    saleState.payment_type,
    state.status,
  ]);

  const selectedPayment = statusOptions.find(
    type =>
      type.value ===
      (props.type === 'inventory'
        ? state.status
        : props.type === 'sale'
        ? saleState.payment_type
        : ''), // replace '' with more options
  )?.label;

  const onSelectAreaOption = (v: string, k: string) => {
    if (props.type === 'inventory') {
      setState({...state, [k]: v});
    } else {
      setSaleState({...saleState, [k]: v});
    }
  };

  var formCompleted = false;

  const handleComplete = async () => {
    if (props.type === 'inventory') {
      formCompleted = Object.values(state).every(x => Boolean(x));
      if (!formCompleted) {
        const {payload, error} = await createInventory(state);
        if (payload) {
          dispatch(addItem(payload));
        }
        if (error) {
          Alert.alert(
            'Error',
            'An Occured While Storing Your Data, Kindly Check Back Later',
          );
        } else {
          setVisible(false);
          setState(inventoryInitialState);
        }
      } else {
        Alert.alert('Error', 'Form Incomplete');
      }
    } else if (props.type === 'sale') {
      formCompleted = Object.values(saleState).every(x => Boolean(x));
      if (!formCompleted) {
        const {payload, error} = await createSale(saleState);
        if (payload) {
          dispatch(addToSales(payload));
        }
        if (error) {
          Alert.alert(
            'Error',
            'An Occured While Storing Your Data, Kindly Check Back Later',
          );
        } else {
          setVisible(false);
          setSaleState(saleInitialState);
        }
      } else {
        Alert.alert('Error', 'Form Incomplete');
      }
    }
  };

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
          Shop Name: {props.shop}
        </Text>
        <Text
          fontWeight={'700'}
          fontSize={'6xl'}
          color={
            props.type === 'expense'
              ? 'red500'
              : props.type === 'sale'
              ? 'green500'
              : props.type === 'payout'
              ? 'blue200'
              : 'white'
          }>
          {props.amount?.toLocaleString('en-NG', {
            style: 'currency',
            currency: 'NGN',
          })}
        </Text>
      </Div>
      <Div
        row
        w={'100%'}
        py={10}
        justifyContent={'flex-end'}
        alignItems={'center'}>
        <Button
          bg={COLORS.secondary}
          h={50}
          w={50}
          rounded="circle"
          onPress={() => setVisible(true)}>
          <Icon name="plus" color="#ff0a5f" />
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
                {props.type === 'inventory'
                  ? 'Add Item ToInventory'
                  : props.type === 'sale'
                  ? 'Record Sale'
                  : 'Stuff'}
              </Text>
              <Div w={100} bg={COLORS.primary} h={2} my={20} />
            </Div>
            {props.type === 'inventory' && (
              <Div>
                <Div mb={16}>
                  <Text mb={8} fontWeight="bold">
                    Item Name <Text color="red">*</Text>
                  </Text>
                  <Input
                    bg="#F5F5F5"
                    borderWidth={1}
                    keyboardType="ascii-capable"
                    borderColor="#CBCBCB"
                    rounded="sm"
                    returnKeyType="next"
                    focusBorderColor="blue700"
                    placeholder="Enter Item's name"
                    value={state.item_name}
                    onChangeText={text => setState({...state, item_name: text})}
                  />
                </Div>
                <Div mb={16}>
                  <Text mb={8} fontWeight="bold">
                    Quantity <Text color="red">*</Text>
                  </Text>
                  <Input
                    bg="#F5F5F5"
                    borderWidth={1}
                    keyboardType="numeric"
                    borderColor="#CBCBCB"
                    rounded="sm"
                    returnKeyType="next"
                    focusBorderColor="blue700"
                    placeholder="Enter Quantity"
                    value={state.quantity}
                    onChangeText={text => setState({...state, quantity: text})}
                  />
                </Div>
                <Div mb={16}>
                  <Text mb={8} fontWeight="bold">
                    Cost Price <Text color="red">*</Text>
                  </Text>
                  <Input
                    bg="#F5F5F5"
                    borderWidth={1}
                    keyboardType="numeric"
                    borderColor="#CBCBCB"
                    rounded="sm"
                    returnKeyType="next"
                    focusBorderColor="blue700"
                    placeholder="Enter Cost Price's For One Item"
                    value={state.cost_price}
                    onChangeText={text =>
                      setState({...state, cost_price: text})
                    }
                  />
                </Div>
                <Div mb={16}>
                  <Text mb={8} fontWeight="bold">
                    Standard Selling Price <Text color="red">*</Text>
                  </Text>
                  <Input
                    bg="#F5F5F5"
                    borderWidth={1}
                    keyboardType="numeric"
                    borderColor="#CBCBCB"
                    rounded="sm"
                    returnKeyType="next"
                    focusBorderColor="blue700"
                    placeholder="Enter Standard Selling Price's For One Item"
                    value={state.selling_price_standard}
                    onChangeText={text =>
                      setState({...state, selling_price_standard: text})
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
                        if (dropdownSizeRef.current) {
                          dropdownSizeRef.current.open();
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
                      {selectedStatus ? (
                        <Text>{selectedStatus}</Text>
                      ) : (
                        <Text color="rgba(79, 86, 98, 0.9)">Select</Text>
                      )}
                    </TouchableOpacity>
                  </Div>
                  <Select
                    onSelect={v => onSelectAreaOption(v, 'status')}
                    ref={dropdownSizeRef}
                    value={state.status}
                    title="Choose Status"
                    mt="md"
                    pb="2xl"
                    roundedTop="xl"
                    data={statusOptions}
                    renderItem={item => (
                      <Select.Option value={item.value} py="md" px="xl">
                        <Text>{item.label}</Text>
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
            )}

            {props.type === 'sale' && (
              <Div>
                <Div row mb={36}>
                  <Div flex={1} mx={4}>
                    <Text mb={8} fontWeight="bold">
                      Select Item From Your Inventory <Text color="red">*</Text>
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        if (dropdownItemRef.current) {
                          dropdownItemRef.current.open();
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
                      {selectedItem ? (
                        <Text>{selectedItem}</Text>
                      ) : (
                        <Text color="rgba(79, 86, 98, 0.9)">Select Item</Text>
                      )}
                    </TouchableOpacity>
                  </Div>
                  <Select
                    onSelect={v => onSelectAreaOption(v, 'item_id')}
                    ref={dropdownItemRef}
                    value={saleState.item_name}
                    title="Choose Status"
                    mt="md"
                    pb="2xl"
                    roundedTop="xl"
                    data={inventories}
                    renderItem={item => (
                      <Select.Option value={item.id} py="md" px="xl">
                        <Text>{item.item_name}</Text>
                      </Select.Option>
                    )}
                  />
                </Div>
                <Div mb={16}>
                  <Text mb={8} fontWeight="bold">
                    Quantity <Text color="red">*</Text>
                  </Text>
                  <Input
                    bg="#F5F5F5"
                    borderWidth={1}
                    keyboardType="numeric"
                    borderColor="#CBCBCB"
                    rounded="sm"
                    returnKeyType="next"
                    focusBorderColor="blue700"
                    placeholder="Enter Item's name"
                    value={saleState.quantity.toString()}
                    onChangeText={text =>
                      setSaleState({...saleState, quantity: Number(text)})
                    }
                  />
                </Div>
                <Div mb={16}>
                  <Text mb={8} fontWeight="bold">
                    Selling Price <Text color="red">*</Text>
                  </Text>
                  <Input
                    bg="#F5F5F5"
                    borderWidth={1}
                    keyboardType="numeric"
                    borderColor="#CBCBCB"
                    rounded="sm"
                    returnKeyType="next"
                    focusBorderColor="blue700"
                    placeholder="How Much Did You Sell It?"
                    value={saleState.selling_price.toString()}
                    onChangeText={text =>
                      setSaleState({...saleState, selling_price: Number(text)})
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
                        if (dropdownTypeRef.current) {
                          dropdownTypeRef.current.open();
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
                      {selectedType ? (
                        <Text>{selectedType}</Text>
                      ) : (
                        <Text color="rgba(79, 86, 98, 0.9)">Select</Text>
                      )}
                    </TouchableOpacity>
                  </Div>
                  <Select
                    onSelect={v => onSelectAreaOption(v, 'payment_type')}
                    ref={dropdownTypeRef}
                    value={saleState.payment_type}
                    title="Choose Status"
                    mt="md"
                    pb="2xl"
                    roundedTop="xl"
                    data={paymentOptions}
                    renderItem={item => (
                      <Select.Option value={item.value} py="md" px="xl">
                        <Text>{item.label}</Text>
                      </Select.Option>
                    )}
                  />
                </Div>
                <Div row mb={16}>
                  <Button
                    w={'100%'}
                    bg={COLORS.dark_blue}
                    onPress={() => handleComplete()}>
                    Record Sale
                  </Button>
                </Div>
              </Div>
            )}
          </Div>
        </Modal>
      </Div>
    </Div>
  );
};

export default NewItem;
