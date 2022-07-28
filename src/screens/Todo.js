import React, {Component} from 'react';
import {View, VStack, Box, Heading, Toast} from 'native-base';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as todoAction from '../redux/actions';
import InputTitle from '../components/TodoScreen/InputTitle';
import todoItem from '../models/todoItem';
import {ViewTodo} from './../components/TodoScreen/ViewTodo';

export class Todo extends Component {
  constructor(props) {
    super(props);
  }

  // addTodo = title => {
  //   const todo = new todoItem(title);
  //   this.setState({
  //     todos: [...this.state.todos, todo],
  //   });
  // };

  // removeTodo = id => {
  //   this.setState({
  //     todos: this.state.todos.filter(todo => todo.getId() !== id),
  //   });
  // };

  // toggleTodo = id => {
  //   const todos = this.state.todos.map(todo => {
  //     if (todo.getId() === id) {
  //       todo.setCompleted(!todo.isCompleted());
  //     }
  //     return todo;
  //   });
  //   this.setState({todos}, () => {});
  // };

  // setTitle = async text => {
  //   // await this.setState({title: text});
  //   if (text.length > 0) {
  //     await this.setState({title: text});
  //     this.addTodo(this.state.title);
  //   } else {
  //     Toast.show({
  //       render: () => {
  //         return (
  //           <Box
  //             bg="danger.600"
  //             px="2"
  //             py="1"
  //             rounded="sm"
  //             mt={5}
  //             _text={{
  //               color: 'warmGray.50',
  //             }}>
  //             กรุณากรอกข้อมูล
  //           </Box>
  //         );
  //       },
  //       placement: 'top',
  //       status: 'warning',
  //     });
  //   }
  // };

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
