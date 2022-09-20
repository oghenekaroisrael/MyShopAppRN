/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
// import {Div, Text} from 'react-native-magnus';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native';
import WelcomeSection from '../components/WelcomeSection/WelcomeSection';
import {countShops, fetchSalesHistory} from '../services/shop';
import {ISale} from '../types';
import {COLORS} from '../constants/index';
import SalesList from '../components/Lists/SalesList';
import ProfileBox from '../components/Box/ProfileBox';
import General from '../components/Box/General';

const ProfileScreen: React.FC = (props: any) => {

  return (
    <SafeAreaView style={{backgroundColor: COLORS.dark_blue, flex: 1}}>
      <ProfileBox />
      <General />
    </SafeAreaView>
  );
};

export default ProfileScreen;
