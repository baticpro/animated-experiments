import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import MainScreen from './features/main/MainScreen';
import FirstTransitionScreen from './features/transitions/FirstTransitionScreen';
import SecondTransitionScreen from './features/transitions/SecondTransitionScreen';
import ThirdTransitionScreen from './features/transitions/ThirdTransitionScreen';
import FourthTransitionScreen from './features/transitions/FourthTransitionScreen';
import PreloaderScreen from './features/timings/preloader/PreloaderScreen';

export type RootStackParamList = {
  Main: undefined;
  FirstTransition: undefined;
  SecondTransition: undefined;
  ThirdTransition: undefined;
  FourthTransition: undefined;
  Preloader: undefined;
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
      <RootStack.Screen
        name={'ThirdTransition'}
        component={ThirdTransitionScreen}
      />
      <RootStack.Screen
        name={'FourthTransition'}
        component={FourthTransitionScreen}
      />
      <RootStack.Screen name={'Preloader'} component={PreloaderScreen} />
    </RootStack.Navigator>
  </NavigationContainer>
);
