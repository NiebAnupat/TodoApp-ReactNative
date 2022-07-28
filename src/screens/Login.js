import React, {Component} from 'react';
import {
  VStack,
  Image,
  Text,
  View,
  Input,
  Box,
  FormControl,
  Link,
  HStack,
  Button,
  Icon,
} from 'native-base';

import {FontAwesome} from '@native-base/icons';

export class Login extends Component {
  constructor({navigation}) {
    super();
    this.navigation = navigation;
    this.state = {
      email: '',
      password: '',
    };
  }

  componentDidMount() {
    login = () => {
      console.log('login....');
      this.navigation.navigate('Todo');
    };
  }

  render() {
    const react_logo = require('../assets/img/react-logo.png');

    return (
      <View pt="10" h="100%" bg="#151E31">
        <VStack space="6" >
          <Image
            source={react_logo}
            style={{width: 150, height: 150}}
            alt="Alternate Text"
            size="xs"
            mx="auto"
          />
          <Text
            ml="8"
            mt="3"
            bold
            fontFamily="body"
            fontSize="2xl"
            color="white">
            ยินดีต้อนรับสู่{'\n'}Todo List Application
          </Text>

          <Box safeArea mx="auto" mt="1" w="100%" maxW="300">
            <VStack space={3}>
              <FormControl>
                <FormControl.Label>อีเมลล์</FormControl.Label>
                <Input
                  type="String"
                  fontFamily="body"
                  fontSize="md"
                  color="white"
                  placeholder="อีเมลล์"
                  variant="underlined"
                  InputLeftElement={
                    <Icon
                      as={<FontAwesome name="user" />}
                      size={5}
                      mx="2"
                      color="white"
                    />
                  }
                />
              </FormControl>
              <FormControl>
                <FormControl.Label>รหัสผ่าน</FormControl.Label>
                <Input
                  type="password"
                  fontFamily="body"
                  fontSize="md"
                  color="white"
                  placeholder="รหัสผ่าน"
                  variant="underlined"
                  InputLeftElement={
                    <Icon
                      as={<FontAwesome name="lock" />}
                      size={5}
                      mx="2"
                      color="white"
                    />
                  }
                />
                <Link
                  _text={{
                    fontSize: 'xs',
                    fontWeight: '500',
                    color: 'indigo.500',
                  }}
                  alignSelf="flex-end"
                  mt="1">
                  ลืมรหัสผ่าน ?
                </Link>
              </FormControl>
              <Button
                mt="2"
                colorScheme="indigo"
                onPress={() => {
                  login();
                }}>
                เข้าสู่ระบบ
              </Button>
              <HStack mt="6" justifyContent="center">
                <Text
                  fontSize="sm"
                  color="coolGray.600"
                  _dark={{
                    color: 'warmGray.200',
                  }}>
                  ผู้ใช้งานใหม่?{' '}
                </Text>
                <Link
                  _text={{
                    color: 'indigo.500',
                    fontWeight: 'medium',
                    fontSize: 'sm',
                  }}
                  href="#">
                  สมัครสมาชิกเลย !
                </Link>
              </HStack>
            </VStack>
          </Box>
        </VStack>
      </View>
    );
  }
}

export default Login;
