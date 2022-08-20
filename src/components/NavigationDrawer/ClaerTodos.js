import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Button, Icon, Text, View} from "native-base";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import {bindActionCreators} from "redux";
import * as todoAction from "../../redux/todo/actions";
import * as userAction from "../../redux/user/actions";

export class ClaerTodos extends Component {


    onClearSuccess = () => {
        this.props.clearCompleted();
        this.props.navigation.closeDrawer();
    };

    onClearAll = () => {
        this.props.clearTodoInDB();
        this.props.navigation.closeDrawer();
    }


    render() {

        return (
            <View>
                <Button mt={5} mx={5} rounded={16} colorScheme={"success"} justifyContent={'flex-end'}
                        leftIcon={
                            <Icon
                                as={<FontAwesome5 name={'check'}/>}
                                size={4}
                                mr={2}
                            />}
                        onPress={this.onClearSuccess}>

                    <Text w={'160'} color={"white"}>ลบรายการที่เสร็จแล้ว</Text>
                </Button>
                <Button mt={2} mx={5} rounded={16} colorScheme={"red"} justifyContent={'flex-end'}
                        leftIcon={
                            <Icon
                                as={<FontAwesome5 name={'trash'}/>}
                                size={4}
                                mr={2}
                            />}
                        onPress={this.onClearAll}>
                    <Text w={'160'} color={"white"} >ลบรายการทั้งหมด</Text>
                </Button>
            </View>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(ClaerTodos);