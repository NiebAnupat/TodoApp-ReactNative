import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as todoAction from '../../redux/todo/actions';
import {FlatList} from 'react-native';
import {Text, View, Center, Spinner} from 'native-base';
import {Todo} from './Todo';

export class ViewTodo extends Component {
  constructor(props) {
    super(props);
  }
  renderItem = ({item}) => (
    <Todo
      isCompleted={item.isCompleted}
      getTitle={item.getTitle}
      getId={item.getId}
      toggleTodo={this.props.toggleTodo}
      removeTodo={this.props.removeTodo}
    />
  );
  render() {
    const {todos} = this.props;
    return (
      <View h="78%">
        {this.props.isLoading ? (
          <Center h='100%'>
            <Spinner size="lg" />
          </Center>
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={todos}
            renderItem={this.renderItem}
            keyExtractor={item => JSON.stringify(item)}
          />
        )}
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

export default connect(mapStateToProps, mapDispatchToProps)(ViewTodo);
