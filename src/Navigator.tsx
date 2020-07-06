import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import MainScreen from './features/main/MainScreen';

const RootStack = createStackNavigator();

export const Navigator = () => (
  <NavigationContainer>
    <RootStack.Navigator>
      <RootStack.Screen name={'Main'} component={MainScreen} />
    </RootStack.Navigator>
  </NavigationContainer>
);
