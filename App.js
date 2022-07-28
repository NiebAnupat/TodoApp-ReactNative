/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React from 'react';
 import {NativeBaseProvider, Text, HStack, Icon} from 'native-base';
 import {NavigationContainer} from '@react-navigation/native';
 import {createNativeStackNavigator} from '@react-navigation/native-stack';
 import { Provider } from 'react-redux';
 import {Store} from './src/redux/store';
 import {FontAwesome} from '@native-base/icons';
 import theme from './src/assets/useTheme';
 import Login from './src/screens/Login';
 import Todo from './src/screens/Todo';

 const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={Store}>
      <NativeBaseProvider theme={theme}>
          <NavigationContainer>
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
                  headerTitle: () => (
                    <HStack alignItems="center">
                      <Icon
                        as={<FontAwesome name="list-ul" />}
                        mr="2"
                        color="darkBlue.900"
                        size={5}
                      />
                      <Text fontFamily="body" color="darkBlue.900" fontSize="md">
                        รายการที่ต้องทำ
                      </Text>
                    </HStack>
                  ),
                  headerTitleAlign: 'center',
                  headerBackVisible: false,
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </NativeBaseProvider>
    </Provider>
  );
};
export default App;
