import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import MainScreen from './features/main/MainScreen';
import FirstTransitionScreen from './features/transitions/FirstTransitionScreen';
import SecondTransitionScreen from './features/transitions/SecondTransitionScreen';

export type RootStackParamList = {
  Main: undefined;
  FirstTransition: undefined;
  SecondTransition: undefined;
};

const RootStack = createStackNavigator<RootStackParamList>();

export const Navigator = () => (
  <NavigationContainer>
    <RootStack.Navigator>
      <RootStack.Screen name={'Main'} component={MainScreen} />
      <RootStack.Screen
        name={'FirstTransition'}
        component={FirstTransitionScreen}
      />
      <RootStack.Screen
        name={'SecondTransition'}
        component={SecondTransitionScreen}
      />
    </RootStack.Navigator>
  </NavigationContainer>
);
