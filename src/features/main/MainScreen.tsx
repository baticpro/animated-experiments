import React, {FC} from 'react';
import {View} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '../../Navigator';
import FeatureButton from './ui/FeatureButton';

type Props = StackScreenProps<RootStackParamList, 'Main'>;

const MainScreen: FC<Props> = ({navigation}) => {
  return (
    <View>
      <FeatureButton
        title={'Transition 1'}
        onPress={() => navigation.navigate('FirstTransition')}
      />
      <FeatureButton
        title={'Transition 2'}
        onPress={() => navigation.navigate('SecondTransition')}
      />
      <FeatureButton
        title={'Transition 3'}
        onPress={() => navigation.navigate('ThirdTransition')}
      />
      <FeatureButton
        title={'Transition 4'}
        onPress={() => navigation.navigate('FourthTransition')}
      />
    </View>
  );
};

export default MainScreen;
