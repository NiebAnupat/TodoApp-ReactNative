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
    Modal
} from 'native-base';
import {FontAwesome} from '@native-base/icons';
import auth from '@react-native-firebase/auth';
import * as userAction from '../redux/user/actions';
import * as todoAction from '../redux/todo/actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getErrAuthMsg} from '../assets/getErrAuthMsg';

export class Login extends Component {
    constructor({navigation}) {
        super();
        this.navigation = navigation;
        this.state = {

            email: null,
            password: null,

            userNotSingUp: true,
            isSignUp: false,
            signUpEmail: null,
            signUpPassword: null,
            signUpPasswordConfirm: null,
            signUpName: null,
        };

        auth().onAuthStateChanged(user => {
                if (user) {
                    console.log('User email: ', user.email);
                    console.log(user)
                    this.navigation.navigate('Todo');

                } else {
                    console.log('User is not logged in');
                }
            }
        )
        ;
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
            this.props
                .userLogin(email, password)
                .then(async () => {
                    console.log('login success....');
                    await this.setState({
                        email: '',
                        password: '',
                    });

                    this.navigation.navigate('Todo');
                })
                .catch(errorCode => {
                    console.log('login fail....');
                    console.log('Error Code : ', errorCode);
                    let errorMsg = getErrAuthMsg(errorCode);

                    Toast.show({
                        duration: 1500,
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
                });
        } else {
            Toast.show({
                duration: 1500,
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
    };

    toggleSignUp = async () => {
        console.log('toggleSignUp');
        await this.setState({isSignUp: !this.state.isSignUp});
        console.log('isSignUp : ', this.state.isSignUp);
    }

    handleSignUpEmailChange = text => {
        this.setState({signUpEmail: text});
    }

    handleSignUpPasswordChange = text => {
        this.setState({signUpPassword: text});
    }

    handleSignUpPasswordConfirmChange = text => {
        this.setState({signUpPasswordConfirm: text});
    }

    handleSignUpNameChange = text => {
        this.setState({signUpName: text});
    }

    signUpModal = () => {
        return (
            <Modal isOpen={this.state.isSignUp} onClose={this.toggleSignUp} bg="#151E31">
                <View w={"80%"}>
                    <VStack>
                        <Text bold fontSize={'2xl'} color={"white"} my={3}>สมัครสมาชิก</Text>

                        <FormControl>
                            <Input
                                my={2}
                                color={'warmGray.50'}
                                fontSize={'sm'}
                                placeholder="ชื่อผู้ใช้"
                                onChangeText={this.handleSignUpNameChange}
                                value={this.state.signUpName}
                            />
                        </FormControl>

                        <FormControl>
                            <Input
                                my={2}
                                color={'warmGray.50'}
                                fontSize={'sm'}
                                placeholder="อีเมลล์"
                                onChangeText={this.handleSignUpEmailChange}
                                value={this.state.signUpEmail}
                            />
                        </FormControl>

                        <FormControl>
                            <Input
                                my={2}
                                color={'warmGray.50'}
                                fontSize={'sm'}
                                placeholder="รหัสผ่าน"
                                type="password"
                                onChangeText={this.handleSignUpPasswordChange}
                                value={this.state.signUpPassword}
                            />
                        </FormControl>
                        <FormControl>
                            <Input
                                my={2}
                                color={'warmGray.50'}
                                fontSize={'sm'}
                                placeholder="ยืนยันรหัสผ่าน"
                                type="password"
                                onChangeText={this.handleSignUpPasswordConfirmChange}
                                value={this.state.signUpPasswordConfirm}
                                onSubmitEditing={this.signUp}
                            />
                        </FormControl>
                        <HStack mt={5}>
                            <Button
                                w={'40%'}
                                mx={'auto'}
                                colorScheme={"indigo"}
                                onPress={this.signUp}
                                disabled={
                                    !this.state.signUpEmail ||
                                    !this.state.signUpPassword ||
                                    !this.state.signUpPasswordConfirm ||
                                    !this.state.signUpName
                                }>
                                <Text fontSize={'sm'} color={"warmGray.50"}>สมัครสมาชิก</Text>
                            </Button>

                            <Button
                                w={'40%'}
                                mx={'auto'}
                                colorScheme={"red"}
                                onPress={this.toggleSignUp}>
                                <Text fontSize={'sm'} color={"warmGray.50"}>ยกเลิก</Text>
                            </Button>
                        </HStack>
                    </VStack>
                </View>
            </Modal>
        )
    }

    signUp = async () => {
        const {signUpEmail, signUpPassword, signUpPasswordConfirm, signUpName} = this.state;
        console.log('signUpEmail : ', signUpEmail);
        console.log('signUpPassword : ', signUpPassword);
        console.log('signUpPasswordConfirm : ', signUpPasswordConfirm);
        console.log('signUpName : ', signUpName);
        if (signUpEmail && signUpPassword && signUpPasswordConfirm && signUpName) {
            if (signUpPassword == signUpPasswordConfirm) {
                await this.setState({userNotSingUp: false});
                this.props
                    .userSignUp(signUpEmail, signUpPassword, signUpName)
                    .then(async () => {
                        console.log('signUp success....');
                        await this.setState({
                            isSignUp: false,
                            signUpEmail: '',
                            signUpPassword: '',
                            signUpPasswordConfirm: '',
                            signUpName: '',
                        });

                    }).catch(errorCode => {
                        console.log('signUp fail....');
                        console.log('Error Code : ', errorCode);
                        let errorMsg = getErrAuthMsg(errorCode);

                        Toast.show({
                            duration: 1500,
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
                );
            } else {
                Toast.show({
                    duration: 1500,
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
                                รหัสผ่านไม่ตรงกัน
                            </Box>
                        );
                    },
                });
            }
        } else {
            Toast.show({
                duration: 1500,
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
                            กรุณากรอกข้อมูลให้ครบถ้วน
                        </Box>
                    );
                },
            });
        }
    }

    render() {
        const react_logo = require('../assets/img/react-logo.png');
        return (
            <View pt="1/6" h="100%" bg="#151E31">

                {this.signUpModal()}

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
                                            as={<FontAwesome name="user"/>}
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
                                            as={<FontAwesome name="lock"/>}
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
                            <Button mt="2" colorScheme="indigo" onPress={this.login}>
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
                                    onPress={this.toggleSignUp}>
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
    todoReducer: state.todoReducer,
});

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        Object.assign({}, userAction, todoAction),
        dispatch,
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
