import React, {PureComponent} from 'react';
import {Box, Heading, Input, Icon, Button} from 'native-base';
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
        />
        <Button
          mt="7"
          colorScheme="indigo"
          onPress={() => {
            this.setTitle(this.state.title);
            this.clearText();
          }}>
          เพิ่ม
        </Button>
      </Box>
    );
  }
}

export default InputTitle;
