import React, {Component} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

import {Login} from './../screens/Login';
import {Todo} from './../screens/Todo';

export class DrawerStack extends Component {
  render() {
    const Drawer = createDrawerNavigator();

    return (
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
  }
}

export default DrawerStack;
