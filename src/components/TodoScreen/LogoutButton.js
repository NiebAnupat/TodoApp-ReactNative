import React, {Component} from 'react';
import {Button} from 'native-base';

export class LogoutButton extends Component {
  render() {
    return (
      <Button
        bg="danger.700"
        ml="auto"
        rounded="md"
        onPress={this.props.logout}>
        ออกจากระบบ
      </Button>
    );
  }
}

export default LogoutButton;
