/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/rules-of-hooks */
import {Div, Text, Icon, Image} from 'react-native-magnus';
import React, {useEffect, useState} from 'react';
import {COLORS, icons} from '../../constants/index';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/store/configureStore';
import {IUser} from '../../types';
import {View} from 'react-native-animatable';

const ProfileBox: React.FC = () => {
  const [userData, setUserData] = useState<IUser>({
    id: 0,
    email: '',
    first_name: '',
    last_name: '',
    createdAt: '',
    isVerified: false,
  });

  const user = useSelector(
    (rootState: RootState) => rootState.auth.user,
  ) as unknown as IUser;

  useEffect(() => {
    setUserData(user);
  }, [user]);

  return (
    <View
      style={{
        marginVertical: 20,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
      animation={'fadeIn'}
      delay={500}>
      <Div flexDir={'column'} justifyContent={'center'} alignItems={'center'}>
        <Image
          source={icons.user}
          h={100}
          w={100}
          rounded={'circle'}
          borderWidth={1}
          p={5}
          borderColor={COLORS.white}
        />
        <Text
          fontFamily={'DMSans-Bold'}
          fontSize={'4xl'}
          pt={10}
          color={COLORS.white}>
          {userData?.last_name} {userData?.first_name}
        </Text>
        <Text
          fontFamily={'DMSans-Regular'}
          pt={5}
          fontSize={'sm'}
          color={COLORS.white}>
          {userData?.email}
        </Text>
      </Div>
      <Div
        bg={COLORS.white}
        rounded={'2xl'}
        w={'80%'}
        mx={'10%'}
        flexDir={'column'}
        justifyContent="center"
        alignItems="center">
        <Text fontFamily={'DMSans-Bold'} fontSize={'lg'} py={15}>
          Personal Account Information
        </Text>
        <Div
          borderTopWidth={1}
          borderTopColor={COLORS.lightGrey}
          w={'70%'}
          py={15}>
          <Div row justifyContent={'space-between'} alignItems={'center'}>
            <Text>Last Name</Text>
            <Text>{userData?.last_name}</Text>
          </Div>
          <Div
            row
            justifyContent={'space-between'}
            alignItems={'center'}
            pt={16}>
            <Text>First Name</Text>
            <Text>{userData?.first_name}</Text>
          </Div>

          <Div row justifyContent={'center'} alignItems={'center'} pt={16}>
            <Icon
              fontFamily={'AntDesign'}
              name={'down'}
              fontSize={'2xl'}
              color={COLORS.black}
            />
          </Div>
        </Div>
      </Div>
    </View>
  );
};

export default ProfileBox;
