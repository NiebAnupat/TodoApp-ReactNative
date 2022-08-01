import React, {Component} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Login from '../screens/Login';
import Todo from '../screens/Todo';

export class AuthStack extends Component {
  render() {
    const Stack = createNativeStackNavigator();
    return (
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: 'warmGray.900',
          },
        }}>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{title: 'Login Screen', headerShown: false}}
        />
        <Stack.Screen
          name="Todo"
          component={Todo}
          options={{
            headerShown: false,
            // headerTitle: () => (
            //   <HStack alignItems="center">
            //     <Icon
            //       as={<FontAwesome name="list-ul" />}
            //       mr="2"
            //       color="darkBlue.900"
            //       size={5}
            //     />
            //     <Text fontFamily="body" color="darkBlue.900" fontSize="md">
            //       รายการที่ต้องทำ
            //     </Text>
            //   </HStack>
            // ),
            headerTitleAlign: 'center',
            headerBackVisible: false,
          }}
        />
      </Stack.Navigator>
    );
  }
}

export default AuthStack;
