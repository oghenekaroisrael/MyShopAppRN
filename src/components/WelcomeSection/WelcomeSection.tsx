import {Div, Text, Image} from 'react-native-magnus';
import React from 'react';
import pic from '../../assets/images/pic.jpg';

export type Props = {
  name?: string;
  image?: string;
};

const WelcomeSection: React.FC<Props> = props => {
  return (
    <Div row mx={10} justifyContent={'space-between'} alignItems={'center'}>
      <Div>
        <Text fontWeight={'400'} mb={5} color={'white'}>
          Welcome
        </Text>
        <Text fontWeight={'700'} fontSize={'xl'} color={'white'}>
          {props.name}
        </Text>
      </Div>
      <Div>
        {props.image == null && (
          <Image source={pic} h={60} w={60} rounded="circle" />
        )}
        {props.image != null && (
          <Image
            source={{
              uri: props.image,
            }}
            h={60}
            w={60}
            rounded="circle"
          />
        )}
      </Div>
    </Div>
  );
};

export default WelcomeSection;
