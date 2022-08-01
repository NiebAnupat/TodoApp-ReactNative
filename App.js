/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React from 'react';
import {NativeBaseProvider, Text, HStack, Icon} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Provider} from 'react-redux';
import {Store} from './src/redux/store';
import theme from './src/assets/useTheme';
import auth from '@react-native-firebase/auth';
import {AuthStack} from './src/navigation/AuthStack';
import {DrawerStack} from './src/navigation/DrawerStack';
import Todo from './src/screens/Todo';
import Login from './src/screens/Login';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const useNavigation = () => (
  <Drawer.Navigator
    initialRouteName="Login"
    screenOptions={{
      headerShown: false,
    }}>
    <Drawer.Screen
      name="Login"
      component={Login}
      options={{
        swipeEnabled: false,
        title: null,
        drawerLabel: () => null,
        
      }}
    />
    <Drawer.Screen name="Todo" component={Todo} />
  </Drawer.Navigator>
);

const App = () => {
  return (
    <Provider store={Store}>
      <NativeBaseProvider theme={theme}>
        <NavigationContainer>{useNavigation()}</NavigationContainer>
      </NativeBaseProvider>
    </Provider>
  );
};
export default App;
