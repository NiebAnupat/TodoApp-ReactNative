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
  Toast,
} from 'native-base';
import {FontAwesome} from '@native-base/icons';
import auth from '@react-native-firebase/auth';
import * as userAction from '../redux/user/actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

export class Login extends Component {
  constructor({navigation}) {
    super();
    this.navigation = navigation;
    this.state = {
      email: null,
      password: null,
    };

    auth().onAuthStateChanged(user => {
      if (user) {
        console.log('User email: ', user.email);
        this.navigation.navigate('Todo');
      } else {
        console.log('User is not logged in');
      }
    });
  }

  handleEmailChange = text => {
    this.setState({email: text});
  };

  handlePasswordChange = text => {
    this.setState({password: text});
  };

  login = async () => {
    const {email, password} = this.state;
    if (email && password) {
      await this.props.userLogin(email, password);
      console.log(auth().currentUser);
      if (auth().currentUser) {
        console.log('login success....');
        this.setState({
          email: null,
          password: null,
        });
        this.navigation.navigate('Todo');
      } else {
        console.log('login fail....');
      }
    } else {
      await this.props.userErrorCode(null);
      Toast.show({
        render: () => {
          return (
            <Box
              bg="yellow.600"
              px="2"
              py="1"
              rounded="sm"
              mt={5}
              _text={{
                color: 'warmGray.50',
              }}>
              กรุณากรอกข้อมูล
            </Box>
          );
        },
      });
    }

    const errorCode = await this.props.userReducer.errorCode;
    if (errorCode) {
      console.log('Error Code : ', errorCode);
      let errorMsg = '';
      switch (errorCode) {
        case 'auth/user-not-found':
          errorMsg = 'ไม่พบผู้ใช้งาน';
          break;
        case 'auth/wrong-password':
          errorMsg = 'รหัสผ่านไม่ถูกต้อง';
          break;
        case 'auth/invalid-email':
          errorMsg = 'อีเมลล์ไม่ถูกต้อง';
          break;
        case 'auth/user-disabled':
          errorMsg = 'ผู้ใช้งานถูกระงับ';
          break;
        case 'auth/user-token-expired':
          errorMsg = 'หมดเวลาใช้งาน';
          break;
        case 'auth/user-token-invalid':
          errorMsg = 'หมดเวลาใช้งาน';
          break;
        case 'auth/user-token-not-initialized':
          errorMsg = 'หมดเวลาใช้งาน';
          break;
        case 'auth/user-token-revoked':
          errorMsg = 'หมดเวลาใช้งาน';
          break;

        default:
          errorMsg = 'ไม่สามารถเข้าสู่ระบบได้';
          break;
      }

      Toast.show({
        render: () => {
          return (
            <Box
              bg="yellow.600"
              px="2"
              py="1"
              rounded="sm"
              mt={5}
              _text={{
                color: 'warmGray.50',
              }}>
              {errorMsg}
            </Box>
          );
        },
      });
    }
  };

  componentDidUpdate() {
    console.log(this.state);
  }

  render() {
    const react_logo = require('../assets/img/react-logo.png');
    // const {userLogin,userLogout,userRegister} = this.props;

    return (
      <View pt="10" h="100%" bg="#151E31">
        <VStack space="6">
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
                  value={this.state.email}
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
                  onChangeText={this.handleEmailChange}
                />
              </FormControl>
              <FormControl>
                <FormControl.Label>รหัสผ่าน</FormControl.Label>
                <Input
                  value={this.state.password}
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
                  onChangeText={this.handlePasswordChange}
                  onSubmitEditing={this.login}
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
                  this.login();
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

const mapStateToProps = state => ({
  userReducer: state.userReducer,
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(userAction, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
