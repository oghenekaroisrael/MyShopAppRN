import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

export const COLORS = {
  primary: '#6D71F9',
  secondary: '#54c1fb',
  dark_blue: '#272848',
  card_blue: '#5f61af',
  card: '#F5B638',
  listBg: '#F7F7F7',
  white: '#ffffff',
  black: '#000000',
  danger: '#FE2712',
  success: '#FE2712',
  warning: '#F5B638',
  lightGrey: '#C8C8C8',
  btn: '#083CF3',
  badgeGreen: '#228B22',
  badgeRed: '#FE2712',
  grey: '#EFF0F8',
};

export const appTheme = {COLORS, width, height};

export default appTheme;
