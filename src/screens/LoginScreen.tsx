/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
// import {Div, Text} from 'react-native-magnus';
import React, {useEffect, useState} from 'react';
import {COLORS, icons} from '../constants/index';
import {View} from 'react-native-animatable';
import {Div, Icon, Image, Text, Button, Input} from 'react-native-magnus';
import {useDispatch} from 'react-redux';
import {loginService, validateEmail} from '../services/auth';
import {Alert, TouchableOpacity} from 'react-native';
import {login, storeUserDetails} from '../redux/actions/auth';

const LoginScreen: React.FC = (props: any) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(true);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const formCompleted: Boolean = validateEmail(email) && Boolean(password);

  const onPressLogin = async () => {
    if (formCompleted && !loading) {
      setLoading(true);
      const {payload, error} = await loginService(email, password);
      setLoading(false);
      if (payload && payload?.User) {
        dispatch(login(payload));
        dispatch(storeUserDetails(payload?.User));
      } else {
        console.log(error);
        Alert.alert('Error', 'An error occured while logging you in');
      }
    }
  };

  const _goToSignupScreen = () => {
    props.navigation.navigate('Signup');
  };

  const _goToResetPasswordScreen = () => {
    props.navigation.navigate('ResetPassword');
  };

  return (
    <View
      animation={'fadeInLeft'}
      easing={'ease'}
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
        <Image source={icons.welcome} h={200} w={200} />
        <Div
          w={'100%'}
          bg={COLORS.white}
          p={20}
          rounded={'xl'}
          flexDir={'column'}
          justifyContent={'center'}
          alignItems={'center'}>
          <Div mb={20}>
            <Text fontSize={'6xl'} fontFamily={'DMSans-Bold'}>
              Login
            </Text>
          </Div>
          <Div mx={20}>
            <Input
              placeholder="E-mail"
              mb={16}
              w={'100%'}
              keyboardType="email-address"
              returnKeyType="next"
              textContentType="emailAddress"
              focusBorderColor="blue700"
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={text => setEmail(text)}
              value={email}
              prefix={
                <Icon
                  mx={8}
                  name="mail"
                  color="gray900"
                  fontFamily={'Fontisto'}
                />
              }
            />
            <Div mb={16}>
              <Input
                mb={8}
                placeholder="Password"
                returnKeyType="done"
                textContentType="password"
                secureTextEntry={isPasswordVisible}
                focusBorderColor="blue700"
                autoCapitalize="none"
                onChangeText={text => setPassword(text)}
                value={password}
                prefix={
                  <Icon
                    mx={8}
                    name="lock"
                    color="gray900"
                    fontFamily={'SimpleLineIcons'}
                  />
                }
                suffix={
                  <TouchableOpacity
                    onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                    <Icon
                      // mx={8}
                      fontSize={'4xl'}
                      name="fingerprint"
                      color="gray900"
                      fontFamily={'MaterialCommunityIcons'}
                    />
                  </TouchableOpacity>
                }
              />
              <Div alignItems="flex-end">
                <TouchableOpacity onPress={_goToResetPasswordScreen}>
                  <Text
                    fontSize="xs"
                    textAlign="center"
                    color={COLORS.primary}
                    fontWeight="600">
                    Forgotten Passowrd?
                  </Text>
                </TouchableOpacity>
              </Div>
            </Div>
            <Button
              block
              mb={32}
              loading={loading}
              disabled={!formCompleted}
              bg={COLORS.dark_blue}
              onPress={onPressLogin}>
              Log In
            </Button>
            <Div alignItems="center">
              <TouchableOpacity onPress={_goToSignupScreen}>
                <Text color={COLORS.primary} fontWeight="600">
                  Create Account
                </Text>
              </TouchableOpacity>
            </Div>
          </Div>
        </Div>
      </Div>
    </View>
  );
};

export default LoginScreen;
