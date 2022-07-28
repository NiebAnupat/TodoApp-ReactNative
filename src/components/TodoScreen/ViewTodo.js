import React, {Component, memo} from 'react';
import {ScrollView, FlatList} from 'react-native';
import {Text, View} from 'native-base';
import {Todo} from './Todo';

import key from 'weak-key';
import uuid from 'uuid-random';

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
        <FlatList
          showsVerticalScrollIndicator={false}
          data={todos}
          renderItem={this.renderItem}
          //     keyExtractor={()=>uuid()}
          //     keyExtractor={item => key(item)}
          keyExtractor={item => JSON.stringify(item)}
        />
      </View>
    );
  }
}

export default memo(ViewTodo);
