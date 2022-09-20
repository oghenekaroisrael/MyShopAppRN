/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';

import {
  NavigationContainer,
  NavigatorScreenParams,
} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {
  BottomTabBar,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import {TouchableOpacity} from 'react-native';
import {COLORS} from '../constants/index';
import SalesScreen from '../screens/SalesScreen';
import ExpensesScreen from '../screens/ExpensesScreen';
import PayoutScreen from '../screens/PayoutScreen';
import InventoryScreen from '../screens/InventoryScreen';
import ReportsScreen from '../screens/ReportsScreen';
import {Div, Icon} from 'react-native-magnus';
import BankScreen from '../screens/BankScreen';
import ProfileScreen from '../screens/ProfileScreen';
import {View} from 'react-native-animatable';
import {useDispatch, useSelector} from 'react-redux';
import {MAX_RETRIES} from '../constants';
import {RootState} from '../redux/store/configureStore';
import {storeUserDetails} from '../redux/actions/auth';
import {loadUserDetailsService, logout} from '../services/auth';
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import {AuthResponse, IUser} from '../types';

const Stack = createNativeStackNavigator();
const Bottom = createBottomTabNavigator();

export type RootStackParamList = {
  Main: {user: IUser | undefined};
  Login: undefined;
  ForgotPassword: undefined;
  Signup: undefined;
  Splash: undefined;
  Home: NavigatorScreenParams<HomeStackParams>;
  Inventory: NavigatorScreenParams<InventoryStackParams>;
  SalesPage: NavigatorScreenParams<SalesStackParams>;
  PayoutsPage: NavigatorScreenParams<PayoutsStackParams>;
  ExpensesPage: NavigatorScreenParams<ExpensesStackParams>;
};
export type HomeStackParams = {
  Home: {user: IUser | undefined};
  Inventory: {user: IUser | undefined};
  Sales: {user: IUser | undefined};
  Expenses: {user: IUser | undefined};
  Payouts: {user: IUser | undefined};
  Banks: {user: IUser | undefined};
  Reports: {user: IUser | undefined};
};

export type InventoryStackParams = {
  Inventory: undefined;
  NewInventory: undefined;
};

export type SalesStackParams = {
  Sales: undefined;
  NewSale: undefined;
};

export type ExpensesStackParams = {
  Expenses: undefined;
  NewExpense: undefined;
};

export type PayoutsStackParams = {
  Payouts: undefined;
  NewPayout: undefined;
};

export type RootStackScreenProp = NativeStackScreenProps<RootStackParamList>;

const RootStack = createNativeStackNavigator<RootStackParamList>();

function HomeStackScreen() {
  const auth = useSelector(
    (state: RootState) => state.auth,
  ) as unknown as AuthResponse;
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{headerShown: false}}
        name="Dashboard"
        component={HomeScreen}
        initialParams={{user: auth.user}}
      />
      <Stack.Screen
        options={({navigation}) => ({
          headerTransparent: true,
          headerTitleStyle: {
            color: COLORS.white,
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Div bg={COLORS.white} p={5} rounded={'lg'}>
                <Icon
                  name={'arrow-left'}
                  fontFamily={'Feather'}
                  fontSize={'4xl'}
                  color={COLORS.dark_blue}
                />
              </Div>
            </TouchableOpacity>
          ),
        })}
        name="Expenses"
        component={ExpensesScreen}
      />
      <Stack.Screen
        options={({navigation}) => ({
          headerTransparent: true,
          headerTitleStyle: {
            color: COLORS.white,
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Div bg={COLORS.white} p={5} rounded={'lg'}>
                <Icon
                  name={'arrow-left'}
                  fontFamily={'Feather'}
                  fontSize={'4xl'}
                  color={COLORS.dark_blue}
                />
              </Div>
            </TouchableOpacity>
          ),
        })}
        name="Inventory"
        component={InventoryScreen}
      />
      <Stack.Screen
        options={({navigation}) => ({
          headerTransparent: true,
          headerTitleStyle: {
            color: COLORS.white,
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Div bg={COLORS.white} p={5} rounded={'lg'}>
                <Icon
                  name={'arrow-left'}
                  fontFamily={'Feather'}
                  fontSize={'4xl'}
                  color={COLORS.dark_blue}
                />
              </Div>
            </TouchableOpacity>
          ),
        })}
        name="Sales"
        component={SalesScreen}
      />
      <Stack.Screen
        options={({navigation}) => ({
          headerTransparent: true,
          headerTitleStyle: {
            color: COLORS.white,
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Div bg={COLORS.white} p={5} rounded={'lg'}>
                <Icon
                  name={'arrow-left'}
                  fontFamily={'Feather'}
                  fontSize={'4xl'}
                  color={COLORS.dark_blue}
                />
              </Div>
            </TouchableOpacity>
          ),
        })}
        name="Payouts"
        component={PayoutScreen}
      />
    </Stack.Navigator>
  );
}

function BottomNav() {
  return (
    <Bottom.Navigator
      initialRouteName="Home"
      tabBar={props => (
        <View animation={'fadeInUp'} duration={4000}>
          <BottomTabBar {...props} />
        </View>
      )}
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 25,
          left: 20,
          right: 20,
          elevation: 0,
          borderRadius: 15,
          height: 70,
          justifyContent: 'center',
          alignContent: 'center',
        },
      }}>
      <Bottom.Screen
        name="ReportsPage"
        component={ReportsScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View
              animation={'jello'}
              duration={9000}
              easing={'ease'}
              style={{
                top: focused ? -20 : 10,
                backgroundColor: focused ? COLORS.primary : 'transparent',
                padding: focused ? 10 : 0,
                borderRadius: focused ? 20 : 0,
              }}>
              <Icon
                name={'pie-chart'}
                fontSize={'3xl'}
                fontFamily={'Feather'}
                color={focused ? '#ffffff' : '#999'}
              />
            </View>
          ),
        }}
      />
      <Bottom.Screen
        name="InventoryPage"
        component={InventoryScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View
              style={{
                top: focused ? -20 : 10,
                backgroundColor: focused ? COLORS.primary : 'transparent',
                padding: focused ? 10 : 0,
                borderRadius: focused ? 20 : 0,
              }}>
              <Icon
                name={'boxes'}
                fontSize={'3xl'}
                fontFamily={'FontAwesome5'}
                color={focused ? '#ffffff' : '#999'}
              />
            </View>
          ),
        }}
      />
      <Bottom.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View
              style={{
                top: focused ? -20 : 10,
                backgroundColor: focused ? COLORS.primary : 'transparent',
                padding: focused ? 10 : 0,
                borderRadius: focused ? 20 : 0,
              }}>
              <Icon
                name={'home'}
                fontSize={'3xl'}
                fontFamily={'Octicons'}
                color={focused ? '#ffffff' : '#999'}
              />
            </View>
          ),
        }}
      />
      <Bottom.Screen
        name="Banks"
        component={BankScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View
              style={{
                top: focused ? -20 : 10,
                backgroundColor: focused ? COLORS.primary : 'transparent',
                padding: focused ? 10 : 0,
                borderRadius: focused ? 20 : 0,
              }}>
              <Icon
                name={'bank'}
                fontSize={'3xl'}
                fontFamily={'AntDesign'}
                color={focused ? '#ffffff' : '#999'}
              />
            </View>
          ),
        }}
      />
      <Bottom.Screen
        name="Profile"
        component={ProfileScreen}
        options={({navigation}) => ({
          headerTransparent: true,
          headerTitleStyle: {
            display: 'none',
          },
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                logout();
                navigation.navigate('Login');
              }}>
              <Div p={15} rounded={'lg'}>
                <Icon
                  name={'logout'}
                  fontFamily={'AntDesign'}
                  fontSize={'4xl'}
                  color={COLORS.white}
                />
              </Div>
            </TouchableOpacity>
          ),
          tabBarIcon: ({focused}) => (
            <View
              style={{
                top: focused ? -20 : 10,
                backgroundColor: focused ? COLORS.primary : 'transparent',
                padding: focused ? 10 : 0,
                borderRadius: focused ? 20 : 0,
              }}>
              <Icon
                name={'user'}
                fontSize={'3xl'}
                fontFamily={'AntDesign'}
                color={focused ? '#ffffff' : '#999'}
              />
            </View>
          ),
        })}
      />
    </Bottom.Navigator>
  );
}
function RootNavigator() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [retries, setRetries] = useState<number>(MAX_RETRIES);
  const auth = useSelector(
    (state: RootState) => state.auth,
  ) as unknown as AuthResponse;

  const handleRetry = () => {
    if (retries > 0) {
      setRetries(retries - 1);
    }
  };

  useEffect(() => {
    // check if user token is still valid
    // if not, try to get new access token with refresh token
    // if that fails, log user out.

    // if all goes well, load user data
    const loadUser = async () => {
      // console.warn('e dey load me o');
      setLoading(true);
      const {payload, error} = await loadUserDetailsService();
      if (payload) {
        dispatch(storeUserDetails(payload));
      } else {
        console.log(error);
        setError('An error occured');
      }
      setLoading(false);
    };

    if (auth.isLoggedIn && !auth.user) {
      loadUser();
    }

    return () => {};
  }, [retries, auth.isLoggedIn, auth.user, dispatch]);
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        {!auth.isLoggedIn ? (
          <>
            <RootStack.Screen
              name="Splash"
              component={SplashScreen}
              options={{
                headerShown: false,
              }}
            />
            <RootStack.Screen
              name="Login"
              component={LoginScreen}
              options={{
                headerShown: false,
              }}
            />

            <RootStack.Screen
              name="Signup"
              component={SignupScreen}
              options={{
                headerShown: false,
              }}
            />

            <RootStack.Screen
              name="ForgotPassword"
              component={LoginScreen}
              options={{
                headerShown: false,
              }}
            />
          </>
        ) : (
          <>
            <RootStack.Screen
              name="Main"
              component={BottomNav}
              initialParams={{user: auth?.user}}
              options={{
                headerShown: false,
              }}
            />
          </>
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

export default RootNavigator;
