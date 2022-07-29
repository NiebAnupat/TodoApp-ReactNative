import React, {PureComponent} from 'react';
import {Box, Heading, Input, Icon, Button, Toast} from 'native-base';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as todoAction from '../../redux/todo/actions';
import {Entypo} from '@native-base/icons';

export class InputTitle extends PureComponent {
  constructor(props) {
    super(props);
    this.setTitle = props.setTitle;
    this.state = {
      title: '',
    };
  }

  componentDidUpdate() {
    console.log('Title : ', this.state.title);
  }

  handleTextChange = text => {
    this.setState({title: text});
  };

  clearText = () => {
    this.setState({title: ''});
  };

  onSubmit = () => {
    const {addTodo} = this.props;
    if (this.state.title.length > 0) {
      this.clearText();
      addTodo(this.state.title);
    } else {
      Toast.show({
        render: () => {
          return (
            <Box
              bg="danger.600"
              px="2"
              py="1"
              rounded="sm"
              mt={5}
              _text={{
                color: 'warmGray.50',
              }}>
              กรุณากรอกข้อมูล
            </Box>
          );
        },
        placement: 'top',
        status: 'warning',
      });
    }
  };

  render() {
    return (
      <Box mt="5%">
        <Heading
          fontFamily="body"
          color="white"
          fontSize="3xl"
          fontWeight="600">
          เพิ่มรายการ
        </Heading>
        <Input
          value={this.state.title}
          placeholder="ชื่อรายการ"
          color="white"
          fontSize="md"
          mt="3"
          p="1"
          variant="underlined"
          InputLeftElement={
            <Icon
              as={<Entypo name="add-to-list" />}
              size={6}
              mx="2"
              color="white"
            />
          }
          onChangeText={text => this.handleTextChange(text)}
          onSubmitEditing={this.onSubmit}
        />
        <Button
          mt="7"
          colorScheme="indigo"
          onPress={this.onSubmit}>
          เพิ่ม
        </Button>
      </Box>
    );
  }
}

const mapStateToProps = state => ({
  todoReducer: state.todoReducer,
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(todoAction, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(InputTitle);
