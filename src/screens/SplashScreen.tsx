/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
// import {Div, Text} from 'react-native-magnus';
import React, {useEffect, useState} from 'react';
import {COLORS, icons} from '../constants/index';
import {View} from 'react-native-animatable';
import {Div, Icon, Image, Text, Button} from 'react-native-magnus';

const SplashScreen: React.FC = (props: any) => {
  const _goToLogin = () => {
    props.navigation.navigate('Login');
  };

  return (
    <View
      animation={'fadeInUpBig'}
      easing={'ease-in'}
      duration={1000}
      style={{
        backgroundColor: COLORS.dark_blue,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Div
        flexDir={'column'}
        justifyContent={'center'}
        alignItems={'center'}
        w={'90%'}
        mx={'5%'}>
        <Image source={icons.welcome2} h={200} w={200} />
        <Div
          bg={COLORS.white}
          p={20}
          rounded={'xl'}
          flexDir={'column'}
          justifyContent={'center'}
          alignItems={'center'}>
          <Div alignItems="center">
            <Text fontSize={'xl'} fontFamily={'DMSans-Bold'}>
              Be Free From Bookkeeping Mayhem!
            </Text>
            <Text fontFamily={'DMSans-Regular'}>
              Giving you seemless book keeping and A report system to manage
              everything along side.
            </Text>
            <Text fontFamily={'DMSans-Regular'}>
              I wish i was you right now.
            </Text>
            <Text fontFamily={'DMSans-Bold'}> Get Started Right Now</Text>
          </Div>
          <Div mt={20}>
            <Button rounded={'circle'} onPress={() => _goToLogin()}>
              <Icon
                name={'arrowright'}
                fontFamily={'AntDesign'}
                color={COLORS.white}
                fontSize={'4xl'}
              />
            </Button>
          </Div>
        </Div>
      </Div>
    </View>
  );
};

export default SplashScreen;
