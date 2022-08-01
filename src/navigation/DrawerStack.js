import React, {Component} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

import {Login} from './../screens/Login';
import {Todo} from './../screens/Todo';

export class DrawerStack extends Component {
  render() {
    const Drawer = createDrawerNavigator();
    return (
      <Drawer.Navigator initialRouteName="Todo">
        <Drawer.Screen name="Todo" component={Todo} />
        <Drawer.Screen name="Logout" lable="ออกจากระบบ" component={Login} />
      </Drawer.Navigator>
    );
  }
}

export default DrawerStack;
