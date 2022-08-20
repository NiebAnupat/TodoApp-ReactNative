import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {Button, Icon, Text, View} from "native-base";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import * as userAction from "../../redux/user/actions";
import * as todoAction from "../../redux/todo/actions";

export class SignOut extends Component {

  toggleConfirm = () =>  this.props.toggelSignOut();
  render() {
    return (
        <View mt={'auto'}>
          <Button
              p={3}
              rounded={0}
              leftIcon={
                <Icon
                    as={<MaterialCommunityIcons name={'exit-run'}/>}
                    size={5}
                />}
              colorScheme="red"
              justifyContent="flex-start"
              onPress={this.toggleConfirm}
          >
            <Text color={"white"}>ออกจากระบบ</Text>
          </Button>
        </View>
    );
  }
}

const mapStateToProps = (state) => ({})

// const mapDispatchToProps = (dispatch) => {
//   return bindActionCreators({ userAction }, dispatch)
// }

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
      Object.assign({}, userAction),
      dispatch,
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(SignOut)