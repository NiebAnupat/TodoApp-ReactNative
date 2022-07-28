import React, {Component} from 'react';
import {View, VStack, Box, Heading, Toast} from 'native-base';
import InputTitle from '../components/TodoScreen/InputTitle';
import todoItem from '../models/todoItem';
import {ViewTodo} from './../components/TodoScreen/ViewTodo';

export class Todo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [
        new todoItem('Todo 1'),
        new todoItem('Todo 2'),
        new todoItem('Todo 3'),
        new todoItem('Todo 4'),
      ],
      title: '',
    };
  }

  addTodo = title => {
    const todo = new todoItem(title);
    this.setState({
      todos: [...this.state.todos, todo],
    });
  };

  removeTodo = id => {
    this.setState({
      todos: this.state.todos.filter(todo => todo.getId() !== id),
    });
  };

  toggleTodo = id => {
    const todos = this.state.todos.map(todo => {
      if (todo.getId() === id) {
        todo.setCompleted(!todo.isCompleted());
      }
      return todo;
    });
    this.setState({todos}, () => {});
  };

  setTitle = async text => {
    // await this.setState({title: text});
    if (text.length > 0) {
      await this.setState({title: text});
      this.addTodo(this.state.title);
    } else {
      Toast.show({
        render: () => {
          return (
            <Box
              bg="danger.600"
              px="2"
              py="1"
              rounded="sm"
              mb={5}
              _text={{
                color: 'warmGray.50',
              }}>
              กรุณากรอกข้อมูล
            </Box>
          );
        },
        placement: 'top',
      });
    }
  };

  render() {
    return (
      <View h="100%" bg="coolGray.800">
        <VStack mx="5%" my="5">
          <InputTitle setTitle={this.setTitle} />
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
              todos={this.state.todos}
              toggleTodo={this.toggleTodo}
              removeTodo={this.removeTodo}
            />
          </Box>
        </VStack>
      </View>
    );
  }
}

export default Todo;
