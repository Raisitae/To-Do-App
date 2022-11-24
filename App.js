/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {MainStackNavigator} from './src/Navigation/StackNavigation';
import FlashMessage from 'react-native-flash-message';
import {UserProvider} from './src/Services/Context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const App = () => {
  return (
    <UserProvider>
      <NavigationContainer>
        <MainStackNavigator />
        <FlashMessage position="top" />
      </NavigationContainer>
    </UserProvider>
  );
};
export default App;
