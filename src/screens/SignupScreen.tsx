/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
// import {Div, Text} from 'react-native-magnus';
import React, {useEffect, useState} from 'react';
import {COLORS, icons} from '../constants/index';
import {View} from 'react-native-animatable';
import {Div, Icon, Image, Text, Button, Input} from 'react-native-magnus';
import {useDispatch} from 'react-redux';
import {signupService, validateEmail} from '../services/auth';
import {Alert, TouchableOpacity} from 'react-native';
import {login} from '../redux/actions/auth';

const SignupScreen: React.FC = (props: any) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [isPasswordVisible1, setIsPasswordVisible1] = useState<boolean>(true);
  const [isPasswordVisible2, setIsPasswordVisible2] = useState<boolean>(true);
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const formCompleted: Boolean =
    validateEmail(email) &&
    password === confirmPassword &&
    Boolean(password) &&
    Boolean(firstName) &&
    Boolean(lastName);

  const onPressSignup = async () => {
    if (formCompleted && !loading) {
      setLoading(true);
      const {payload, error} = await signupService({
        email,
        password,
        first_name: firstName,
        last_name: lastName,
      });
      setLoading(false);
      if (payload) {
        _goToLoginScreen();
      } else {
        console.log(error);
        Alert.alert('Error', 'An error occured while signing you up');
      }
    }
  };

  const _goToLoginScreen = () => {
    props.navigation.navigate('Login');
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
              Signup
            </Text>
          </Div>
          <Div mx={20}>
            <Input
              placeholder="Last Name"
              mb={16}
              w={'100%'}
              keyboardType={'ascii-capable'}
              returnKeyType="next"
              textContentType={'familyName'}
              focusBorderColor="blue700"
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={text => setLastName(text)}
              value={lastName}
              prefix={
                <Icon
                  mx={8}
                  name="user"
                  color="gray900"
                  fontFamily={'Fontisto'}
                />
              }
            />
            <Input
              placeholder="First Name"
              mb={16}
              w={'100%'}
              keyboardType={'ascii-capable'}
              returnKeyType="next"
              textContentType={'name'}
              focusBorderColor="blue700"
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={text => setFirstName(text)}
              value={firstName}
              prefix={
                <Icon
                  mx={8}
                  name="user"
                  color="gray900"
                  fontFamily={'Fontisto'}
                />
              }
            />
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
                focusBorderColor="blue700"
                secureTextEntry={isPasswordVisible1}
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
                    onPress={() => setIsPasswordVisible1(!isPasswordVisible1)}>
                    <Icon
                      // mx={8}
                      name="eye"
                      color="gray900"
                      fontFamily="Feather"
                    />
                  </TouchableOpacity>
                }
              />
            </Div>
            <Div mb={16}>
              <Input
                mb={8}
                placeholder="Confirm Password"
                returnKeyType="done"
                textContentType="password"
                focusBorderColor="blue700"
                autoCapitalize="none"
                secureTextEntry={isPasswordVisible2}
                onChangeText={text => setConfirmPassword(text)}
                value={confirmPassword}
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
                    onPress={() => setIsPasswordVisible2(!isPasswordVisible2)}>
                    <Icon
                      // mx={8}
                      name="eye"
                      color="gray900"
                      fontFamily="Feather"
                    />
                  </TouchableOpacity>
                }
              />
            </Div>
            <Button
              block
              mb={32}
              loading={loading}
              disabled={!formCompleted}
              bg={COLORS.dark_blue}
              onPress={onPressSignup}>
              Register
            </Button>
            <Div alignItems="center">
              <TouchableOpacity onPress={_goToLoginScreen}>
                <Text fontFamily={'DMSans-Regular'} color={COLORS.black}>
                  Already have and Account?{' '}
                  <Text color={COLORS.primary} fontFamily={'DMSans-Bold'}>
                    Login
                  </Text>
                </Text>
              </TouchableOpacity>
            </Div>
          </Div>
        </Div>
      </Div>
    </View>
  );
};

export default SignupScreen;
