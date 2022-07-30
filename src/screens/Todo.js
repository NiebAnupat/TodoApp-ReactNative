import React, {Component} from 'react';
import {View, VStack, Box, Heading, Toast, Spinner} from 'native-base';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as todoAction from '../redux/todo/actions';
import InputTitle from '../components/TodoScreen/InputTitle';
import {ViewTodo} from './../components/TodoScreen/ViewTodo';

export class Todo extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.clearTodo();
    this.props.fetchTodos();
  }

  render() {
    const {todoReducer} = this.props;
    const {todos} = todoReducer;
    const {removeTodo, toggleTodo} = this.props;
    return (
      <View h="100%" bg="coolGray.800">
        <VStack mx="5%" my="5">
          <InputTitle navigation={this.props.navigation}/>
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
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(todoAction, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Todo);
