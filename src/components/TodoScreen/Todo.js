import React, {PureComponent} from 'react';
import {TouchableOpacity} from 'react-native';
import {Feather} from '@native-base/icons';
import {Box, Text, Icon, Checkbox, PresenceTransition} from 'native-base';

export class Todo extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: true,
    };
  }

  toggleVisible = () => {
    this.setState({isVisible: !this.state.isVisible});
  };

  render() {
    const {isCompleted, getTitle, getId, toggleTodo, removeTodo} = this.props;
    const id = getId();
    const status = isCompleted();
    return (
      <PresenceTransition
        visible={this.state.isVisible}
        initial={{
          opacity: 0,
          scale: 0,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          transition: {
            duration: 100,
          },
        }}>
        <TouchableOpacity onPress={() => toggleTodo(id)}>
          <Box
            alignItems="center"
            p="4"
            w="100%"
            my="2"
            bg="coolGray.700"
            borderRadius="10"
            display="flex"
            flexDirection="row"
            justifyContent="space-between">
            <Checkbox isChecked={status} onChange={() => toggleTodo(id)}>
              <Text
                color={status ? 'coolGray.500' : 'warmGray.50'}
                strikeThrough={status}
                fontSize="md"
                ml="2"
                fontWeight={500}>
                {getTitle()}
              </Text>
            </Checkbox>
            <Icon
              as={<Feather name="delete" />}
              color="danger.500"
              size="6"
              onPress={() => {
                this.toggleVisible();
                removeTodo(id);
              }}
            />
          </Box>
        </TouchableOpacity>
      </PresenceTransition>
    );
  }
}

export default Todo;
