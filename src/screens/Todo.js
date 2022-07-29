import React, {Component} from 'react';
import {View, VStack, Box, Heading, Toast} from 'native-base';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as todoAction from '../redux/todo/actions';
import InputTitle from '../components/TodoScreen/InputTitle';
import {ViewTodo} from './../components/TodoScreen/ViewTodo';

export class Todo extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {todoReducer} = this.props;
    const {todos} = todoReducer;
    const {setTitle, removeTodo, toggleTodo} = this.props;
    return (
      <View h="100%" bg="coolGray.800">
        <VStack mx="5%" my="5">
          <InputTitle setTitle={setTitle} />
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
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(todoAction, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Todo);
