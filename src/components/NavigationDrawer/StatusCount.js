import React, {Component} from 'react'
import {connect} from 'react-redux'
import {View, Text, HStack, Box, Image} from 'native-base';

export class StatusCount extends Component {

    getTodosCount = () => {
        return this.props.todoReducer.todos.length;
    }

    getCompletedCount = () => {
        return this.props.todoReducer.todos.filter(todo => todo.completed).length;
    }

    getIncompleteCount = () => {
        return this.props.todoReducer.todos.filter(todo => !todo.completed).length;
    }

    render() {
        return (
            <View>
                <Box bg={'info.500'} rounded={'md'} mt={5} mx={3} p={4} display={'flex'} flexDirection={'row'}>
                    <Text color={"white"} w={'30%'}>ทั้งหมด</Text>
                    <Text color={"white"} mx={'auto'}>{this.getTodosCount()}</Text>
                    <Text color={"white"} ml={'auto'}>รายการ</Text>
                </Box>

                <Box bg={'success.500'} rounded={'md'} mt={5} mx={3} p={4} display={'flex'} flexDirection={'row'}>
                    <Text color={"white"} w={'30%'} >สำเร็จแล้ว</Text>
                    <Text color={"white"} mx={'auto'}>{this.getCompletedCount()}</Text>
                    <Text color={"white"} ml={'auto'}>รายการ</Text>
                </Box>

                <Box bg={'yellow.500'} rounded={'md'} mt={5} mx={3} p={4} display={'flex'} flexDirection={'row'} >
                    <Text color={"white"} w={'30%'} >ยังไม่สำเร็จ</Text>
                    <Text color={"white"} mx={'auto'}>{this.getIncompleteCount()}</Text>
                    <Text color={"white"} ml={'auto'}>รายการ</Text>
                </Box>


            </View>

        );
    }
}

const mapStateToProps = (state) => ({
    todoReducer: state.todoReducer
})

export default connect(mapStateToProps)(StatusCount)