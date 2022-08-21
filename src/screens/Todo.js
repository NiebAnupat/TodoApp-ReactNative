import React, {Component} from 'react';
import {
    View,
    VStack,
    Box,
    Heading,
    Center,
    Button,
    AlertDialog,
    Text,
} from 'native-base';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as todoAction from '../redux/todo/actions';
import * as userAction from '../redux/user/actions';
import InputTitle from '../components/TodoScreen/InputTitle';
import {ViewTodo} from './../components/TodoScreen/ViewTodo';
import { BackHandler} from "react-native";

export class Todo extends Component {
    constructor(props) {
        super(props);

        if (this.props.todoReducer.todos) {
            this.props.clearTodo();
        }
        this.props.fetchTodos().catch(err => {
            console.log('Todo Fetched Error : ', err);
        });

    }



    toggleConfirm = () =>  this.props.toggelSignOut();

    onLogout = () => {
        this.props.userLogout();
        this.props.navigation.navigate('Login');
    };

    confirmLogout = () => {
        return (
            <Center>
                <AlertDialog isOpen={this.props.userReducer.isSignOut} onClose={this.toggleConfirm}>
                    <Box bg="warmGray.100" rounded="md" px="6" py="5" w="5/6">
                        <Heading>ออกจากระบบ</Heading>
                        <Text mt="2">คุณต้องการออกจากระบบหรือไม่ ?</Text>
                        <Button.Group space={2} ml="auto" mt="5">
                            <Button colorScheme="indigo" onPress={this.toggleConfirm}>
                                ยกเลิก
                            </Button>
                            <Button colorScheme="danger" onPress={this.onLogout}>
                                ยืนยัน
                            </Button>
                        </Button.Group>
                    </Box>
                </AlertDialog>
            </Center>
        );
    };

    backAction = () => {
        this.props.toggelSignOut()
        return true;
    };

    componentDidMount() {
        this.backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            this.backAction
        );
    }

    componentWillUnmount() {
        this.backHandler.remove();
    }

    render() {
        const {todos} = this.props.todoReducer;
        const {removeTodo, toggleTodo} = this.props;
        return (
            <View h="100%" bg="coolGray.800">
                {this.confirmLogout()}
                <VStack mx="5%" my="5">
                    <InputTitle confirmLogout={this.toggleConfirm}/>
                    <Box mt="10%">
                        <Heading
                            mb="3"
                            fontSize="2xl"
                            fontWeight="400"
                            underline
                            color="white">
                            รายการของฉัน
                        </Heading>
                        <ViewTodo
                            isLoading={this.props.todoReducer.isLoading}
                            todos={todos}
                            toggleTodo={toggleTodo}
                            removeTodo={removeTodo}
                        />
                    </Box>
                </VStack>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    todoReducer: state.todoReducer,
    userReducer: state.userReducer,
});

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        Object.assign({}, todoAction, userAction),
        dispatch,
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(Todo);
