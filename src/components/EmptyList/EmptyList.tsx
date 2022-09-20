import {View} from 'react-native-animatable';
import React from 'react';
import {Image, Text} from 'react-native-magnus';
import images from '../../constants/images';

const ListEmptyComponent = () => {
  return (
    <View
      animation={'swing'}
      easing={'ease'}
      duration={5000}
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        marginBottom: 150,
      }}>
      <Image h={226} w={219} rounded="circle" source={images.no_items} />
      <Text fontWeight="bold" fontSize={'xl'} pt={20}>
        Nothing Available Right Now.
      </Text>
    </View>
  );
};

export default ListEmptyComponent;
