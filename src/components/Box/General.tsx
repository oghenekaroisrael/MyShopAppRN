import {Div, Icon, ScrollDiv, Text, Toggle} from 'react-native-magnus';
import React, {useState} from 'react';
import {COLORS} from '../../constants/index';

const General: React.FC = () => {
  const [on, toggle] = useState<boolean>(false);
  return (
    <ScrollDiv
      bg={COLORS.listBg}
      p={15}
      h={100}
      maxH={200}
      rounded={'xl'}
      flexDir={'column'}>
      <Text
        fontWeight={'700'}
        fontSize={18}
        py={10}
        mb={5}
        color={COLORS.dark_blue}>
        General
      </Text>
      <Div row mb={10}>
        <Div flex={1} justifyContent={'center'}>
          <Icon
            name={'shopping-store'}
            fontFamily={'Fontisto'}
            fontSize={'4xl'}
            color={COLORS.secondary}
          />
        </Div>
        <Div flex={3}>
          <Div
            flexDir={'column'}
            justifyContent={'center'}
            alignItems={'flex-start'}>
            <Text fontFamily={'DMSans-Bold'} fontSize={'2xl'}>
              Shop Management
            </Text>
            <Text>You Can Perform CRUD Operations and More</Text>
          </Div>
        </Div>
        <Div flex={1} justifyContent={'center'}>
          <Toggle
            on={on}
            onPress={() => toggle(!on)}
            bg={COLORS.primary}
            circleBg={COLORS.dark_blue}
            activeBg={COLORS.dark_blue}
            h={30}
            w={60}
          />
        </Div>
      </Div>

      <Div row mb={10}>
        <Div flex={1} justifyContent={'center'}>
          <Icon
            name={'cash-register'}
            fontFamily={'MaterialCommunityIcons'}
            fontSize={'4xl'}
            color={COLORS.secondary}
          />
        </Div>
        <Div flex={3}>
          <Div
            flexDir={'column'}
            justifyContent={'center'}
            alignItems={'flex-start'}>
            <Text fontFamily={'DMSans-Bold'} fontSize={'2xl'}>
              Sales Management
            </Text>
            <Text>You Can Perform CRUD Operations and More</Text>
          </Div>
        </Div>
        <Div flex={1} justifyContent={'center'}>
          <Toggle
            on={on}
            onPress={() => toggle(!on)}
            bg={COLORS.primary}
            circleBg={COLORS.dark_blue}
            activeBg={COLORS.dark_blue}
            h={30}
            w={60}
          />
        </Div>
      </Div>

      <Div row mb={10}>
        <Div flex={1} justifyContent={'center'}>
          <Icon
            name={'account-cash-outline'}
            fontFamily={'MaterialCommunityIcons'}
            fontSize={'4xl'}
            color={COLORS.secondary}
          />
        </Div>
        <Div flex={3}>
          <Div
            flexDir={'column'}
            justifyContent={'center'}
            alignItems={'flex-start'}>
            <Text fontFamily={'DMSans-Bold'} fontSize={'2xl'}>
              Expenses Management
            </Text>
            <Text>You Can Perform CRUD Operations and More</Text>
          </Div>
        </Div>
        <Div flex={1} justifyContent={'center'}>
          <Toggle
            on={on}
            onPress={() => toggle(!on)}
            bg={COLORS.primary}
            circleBg={COLORS.dark_blue}
            activeBg={COLORS.dark_blue}
            h={30}
            w={60}
          />
        </Div>
      </Div>

      <Div row mb={10}>
        <Div flex={1} justifyContent={'center'}>
          <Icon
            name={'account-cash-outline'}
            fontFamily={'MaterialCommunityIcons'}
            fontSize={'4xl'}
            color={COLORS.secondary}
          />
        </Div>
        <Div flex={3}>
          <Div
            flexDir={'column'}
            justifyContent={'center'}
            alignItems={'flex-start'}>
            <Text fontFamily={'DMSans-Bold'} fontSize={'2xl'}>
              Payroll Management
            </Text>
            <Text>You Can Perform CRUD Operations and More</Text>
          </Div>
        </Div>
        <Div flex={1} justifyContent={'center'}>
          <Toggle
            on={on}
            onPress={() => toggle(!on)}
            bg={COLORS.primary}
            circleBg={COLORS.dark_blue}
            activeBg={COLORS.dark_blue}
            h={30}
            w={60}
          />
        </Div>
      </Div>

      <Div row mb={10}>
        <Div flex={1} justifyContent={'center'}>
          <Icon
            name={'account-cash-outline'}
            fontFamily={'MaterialCommunityIcons'}
            fontSize={'4xl'}
            color={COLORS.secondary}
          />
        </Div>
        <Div flex={3}>
          <Div
            flexDir={'column'}
            justifyContent={'center'}
            alignItems={'flex-start'}>
            <Text fontFamily={'DMSans-Bold'} fontSize={'2xl'}>
              Reports And More
            </Text>
            <Text>You Can Perform CRUD Operations and More</Text>
          </Div>
        </Div>
        <Div flex={1} justifyContent={'center'}>
          <Toggle
            on={on}
            onPress={() => toggle(!on)}
            bg={COLORS.primary}
            circleBg={COLORS.dark_blue}
            activeBg={COLORS.dark_blue}
            h={30}
            w={60}
          />
        </Div>
      </Div>
    </ScrollDiv>
  );
};

export default General;
