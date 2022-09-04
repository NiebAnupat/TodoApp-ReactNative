import React, { Component } from 'react';
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
	Modal,
	Divider,
	WarningOutlineIcon,
} from 'native-base';
import { FontAwesome } from '@native-base/icons';
import auth from '@react-native-firebase/auth';
import * as userAction from '../redux/user/actions';
import * as todoAction from '../redux/todo/actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getErrAuthMsg } from '../assets/getErrAuthMsg';
import { getSignUpErrMsg } from '../assets/getSignUpErrMsg';
import { getForgotPassErrMsg } from '../assets/getForgotPassErrMsg';

export class Login extends Component {
	constructor({ navigation }) {
		super();
		this.navigation = navigation;
		this.state = {
			email: '',
			password: '',

			isNotSignUp: true,
			signUpPopup: false,
			signUpEmail: null,
			signUpPassword: null,
			signUpPasswordConfirm: null,
			signUpName: null,

			isForgotPassword: false,
			forgotPasswordEmail: null,
		};

		auth().onAuthStateChanged((user) => {
			if (user && this.state.isNotSignUp) {
				console.log('User email: ', user.email);
				console.log(user);
				this.navigation.navigate('Todo');
			} else {
				console.log('User is not logged in');
			}
		});
	}

	handleEmailChange = (text) => {
		this.setState({ email: text });
	};

	handlePasswordChange = (text) => {
		this.setState({ password: text });
	};

	clearText = () => {
		this.setState({ email: '', password: '' });
	};

	login = async () => {
		const { email, password } = this.state;
		if (!this.state.isNotSignUp) this.toggleSignUpStatus();
		if (email && password) {
			this.props
				.userLogin(email, password)
				.then(async () => {
					console.log('login success....');
					this.clearText();
					this.navigation.navigate('Todo');
				})
				.catch((errorCode) => {
					console.log('login fail....');
					console.log('Error Code : ', errorCode);
					let errorMsg = getErrAuthMsg(errorCode);

					Toast.show({
						duration: 1500,
						render: () => {
							return (
								<Box
									bg='yellow.600'
									px='2'
									py='1'
									rounded='sm'
									mt={5}
									_text={{
										color: 'warmGray.50',
									}}
								>
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
							bg='yellow.600'
							px='2'
							py='1'
							rounded='sm'
							mt={5}
							_text={{
								color: 'warmGray.50',
							}}
						>
							กรุณากรอกข้อมูล
						</Box>
					);
				},
			});
		}
	};

	toggleSignUpStatus = async () => {
		console.log('toggleSignUp');
		await this.props.toggelSignUp();
		await this.setState({
			isNotSignUp: this.props.userReducer.isNotSignUp,
		});
		console.log('This isNotSignUp : ', this.state.isNotSignUp);
		console.log('Reducer isNotSignUp : ', this.props.userReducer.isNotSignUp);
	};

	toggleSignUpPopup = () => {
		this.setState({
			signUpPopup: !this.state.signUpPopup,
		});
	};

	handleSignUpEmailChange = (text) => {
		this.setState({ signUpEmail: text });
	};

	handleSignUpPasswordChange = (text) => {
		this.setState({ signUpPassword: text });
	};

	handleSignUpPasswordConfirmChange = (text) => {
		this.setState({ signUpPasswordConfirm: text });
	};

	handleSignUpNameChange = (text) => {
		this.setState({ signUpName: text });
	};

	signUpModal = () => {
		const { SignUpError } = this.props.userReducer;
		return (
			<Modal
				animationPreset='slide'
				isOpen={this.state.signUpPopup}
				onClose={this.toggleSignUpPopup}
				bg='#151E31'
			>
				<View w={'80%'}>
					<VStack>
						<Text
							bold
							fontSize={'2xl'}
							color={'white'}
							my={3}
						>
							สมัครสมาชิก
						</Text>

						<FormControl>
							<Input
								my={2}
								color={'warmGray.50'}
								fontSize={'sm'}
								placeholder='ชื่อผู้ใช้'
								onChangeText={this.handleSignUpNameChange}
								value={this.state.signUpName}
							/>
						</FormControl>

						<FormControl>
							<Input
								my={2}
								color={'warmGray.50'}
								fontSize={'sm'}
								placeholder='อีเมลล์'
								onChangeText={this.handleSignUpEmailChange}
								value={this.state.signUpEmail}
							/>
						</FormControl>

						<FormControl>
							<Input
								my={2}
								color={'warmGray.50'}
								fontSize={'sm'}
								placeholder='รหัสผ่าน'
								type='password'
								onChangeText={this.handleSignUpPasswordChange}
								value={this.state.signUpPassword}
							/>
						</FormControl>
						<FormControl>
							<Input
								my={2}
								w={'100%'}
								color={'warmGray.50'}
								fontSize={'sm'}
								placeholder='ยืนยันรหัสผ่าน'
								type='password'
								onChangeText={this.handleSignUpPasswordConfirmChange}
								value={this.state.signUpPasswordConfirm}
								onSubmitEditing={this.signUp}
							/>
							{SignUpError ? (
								<FormControl.ErrorMessage
									isInvalid
									leftIcon={<WarningOutlineIcon size={'sm'} />}
									_text={{
										fontSize: 'sm',
									}}
								>
									{getSignUpErrMsg(SignUpError)}
								</FormControl.ErrorMessage>
							) : null}
						</FormControl>
						<HStack mt={5}>
							<Button
								w={'40%'}
								mx={'auto'}
								colorScheme={'indigo'}
								onPress={this.signUp}
							>
								<Text
									fontSize={'sm'}
									color={'warmGray.50'}
								>
									สมัครสมาชิก
								</Text>
							</Button>

							<Button
								w={'40%'}
								mx={'auto'}
								colorScheme={'red'}
								onPress={this.toggleSignUpPopup}
							>
								<Text
									fontSize={'sm'}
									color={'warmGray.50'}
								>
									ยกเลิก
								</Text>
							</Button>
						</HStack>
					</VStack>
				</View>
			</Modal>
		);
	};

	signUp = async () => {
		await this.toggleSignUpStatus();
		const { signUpEmail, signUpPassword, signUpPasswordConfirm, signUpName } =
			this.state;
		console.log('signUpEmail : ', signUpEmail);
		console.log('signUpPassword : ', signUpPassword);
		console.log('signUpPasswordConfirm : ', signUpPasswordConfirm);
		console.log('signUpName : ', signUpName);
		if (signUpEmail && signUpPassword && signUpPasswordConfirm && signUpName) {
			if (signUpPassword === signUpPasswordConfirm) {
				this.setState({ userNotSingUp: false });
				try {
					await this.props.userSignUp(signUpEmail, signUpPassword, signUpName);
					console.log('signUp success....');
					this.setState({
						isSignUp: false,
						signUpEmail: '',
						signUpPassword: '',
						signUpPasswordConfirm: '',
						signUpName: '',
					});

					this.toggleSignUpPopup();
				} catch (error) {
					console.log('error : ', error);
					this.props.signUpErrorMsg(error.code);
					Toast.show({
						text: error.code,
					});
				}
			} else {
				this.props.signUpErrorMsg('password not match');
			}
		} else {
			this.props.signUpErrorMsg('All field is required');
		}
	};

	toggleForgotPasswordPopup = async () => {
		await this.setState({
			isForgotPassword: !this.state.isForgotPassword,
		});
	};

	forgotPassword = async () => {
		const { forgotPasswordEmail } = this.state;
		console.log('forgotPasswordEmail : ', forgotPasswordEmail);
		if (forgotPasswordEmail) {
			try {
				await this.props.userForgotPassword(forgotPasswordEmail);
				console.log('forgotPassword success....');
				this.setState({
					forgotPasswordEmail: '',
				});
				this.props.forgotPasswordErrorMsg(null);
				this.toggleForgotPasswordPopup();
				Toast.show({
					duration: 2000,
					render: () => {
						return (
							<Box
								bg='success.500'
								px='2'
								py='1'
								rounded='sm'
								mt={5}
								_text={{
									color: 'warmGray.50',
								}}
							>
								<Text>ส่งรหัสใหม่สำเร็จ</Text>
							</Box>
						);
					},
				});
			} catch (error) {
				console.log('forgotPassword fail....');
				console.log('error : ', error);
				this.props.forgotPasswordErrorMsg(error.code);
			}
		} else {
			this.props.forgotPasswordErrorMsg('Email is required');
		}
	};

	forgotPasswordModal = () => {
		const { ForgotPasswordError } = this.props.userReducer;
		return (
			<Modal
				animationPreset='slide'
				isOpen={this.state.isForgotPassword}
				onClose={this.toggleForgotPasswordPopup}
				bg='#151E31'
			>
				<View w={'80%'}>
					<VStack>
						<Text
							bold
							fontSize={'2xl'}
							color={'white'}
							my={1}
						>
							ลืมรหัสผ่าน
						</Text>

						<Divider w={'150'} />

						<Text
							fontSize={'md'}
							color={'white'}
							mt={4}
						>
							กรุณากรอกอีเมลล์ที่คุณใช้สมัครไว้
						</Text>

						<FormControl>
							<Input
								mt={2}
								placeholder='อีเมลล์'
								value={this.state.forgotPasswordEmail}
								color={'white'}
								fontSize={'sm'}
								onChangeText={(text) => {
									this.setState({ forgotPasswordEmail: text });
								}}
							/>
							<FormControl.ErrorMessage
								isInvalid
								leftIcon={<WarningOutlineIcon size={'sm'} />}
								_text={{
									fontSize: 'sm',
								}}
							>
								{ForgotPasswordError
									? getForgotPassErrMsg(ForgotPasswordError)
									: null}
							</FormControl.ErrorMessage>
						</FormControl>

						<HStack mt={5}>
							<Button
								w={'40%'}
								mx={'auto'}
								colorScheme={'indigo'}
								onPress={this.forgotPassword}
							>
								<Text
									fontSize={'sm'}
									color={'warmGray.50'}
								>
									ส่งรหัสใหม่
								</Text>
							</Button>

							<Button
								w={'40%'}
								mx={'auto'}
								colorScheme={'red'}
								onPress={this.toggleForgotPasswordPopup}
							>
								<Text
									fontSize={'sm'}
									color={'warmGray.50'}
								>
									ยกเลิก
								</Text>
							</Button>
						</HStack>
					</VStack>
				</View>
			</Modal>
		);
	};

	render() {
		const react_logo = require('../assets/img/react-logo.png');
		return (
			<View
				pt='1/6'
				h='100%'
				bg='#151E31'
			>
				{this.signUpModal()}
				{this.forgotPasswordModal()}

				<VStack space='6'>
					<Image
						source={react_logo}
						style={{ width: 150, height: 150 }}
						alt='Alternate Text'
						size='xs'
						mx='auto'
					/>
					<Text
						ml='8'
						mt='3'
						bold
						fontFamily='body'
						fontSize='2xl'
						color='white'
					>
						ยินดีต้อนรับสู่{'\n'}Todo List Application
					</Text>

					<Box
						safeArea
						mx='auto'
						mt='1'
						w='100%'
						maxW='300'
					>
						<VStack space={3}>
							<FormControl>
								<FormControl.Label>อีเมลล์</FormControl.Label>
								<Input
									value={this.state.email}
									type='String'
									fontFamily='body'
									fontSize='md'
									color='white'
									placeholder='อีเมลล์'
									variant='underlined'
									InputLeftElement={
										<Icon
											as={<FontAwesome name='user' />}
											size={5}
											mx='2'
											color='white'
										/>
									}
									onChangeText={this.handleEmailChange}
								/>
							</FormControl>
							<FormControl>
								<FormControl.Label>รหัสผ่าน</FormControl.Label>
								<Input
									value={this.state.password}
									type='password'
									fontFamily='body'
									fontSize='md'
									color='white'
									placeholder='รหัสผ่าน'
									variant='underlined'
									InputLeftElement={
										<Icon
											as={<FontAwesome name='lock' />}
											size={5}
											mx='2'
											color='white'
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
									alignSelf='flex-end'
									mt='1'
									onPress={this.toggleForgotPasswordPopup}
								>
									ลืมรหัสผ่าน ?
								</Link>
							</FormControl>
							<Button
								mt='2'
								colorScheme='indigo'
								onPress={this.login}
							>
								เข้าสู่ระบบ
							</Button>

							<HStack
								mt='6'
								justifyContent='center'
							>
								<Text
									fontSize='sm'
									color='coolGray.600'
									_dark={{
										color: 'warmGray.200',
									}}
								>
									ผู้ใช้งานใหม่?{' '}
								</Text>
								<Link
									_text={{
										color: 'indigo.500',
										fontWeight: 'medium',
										fontSize: 'sm',
									}}
									onPress={this.toggleSignUpPopup}
								>
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

const mapStateToProps = (state) => ({
	userReducer: state.userReducer,
	todoReducer: state.todoReducer,
});

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators(
		Object.assign({}, userAction, todoAction),
		dispatch
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
