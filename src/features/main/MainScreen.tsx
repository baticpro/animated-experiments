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
    </View>
  );
};

export default MainScreen;
