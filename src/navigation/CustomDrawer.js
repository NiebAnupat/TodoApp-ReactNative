import React, {Component} from 'react';
import {Text, View, ScrollView} from 'native-base';
import Info from '../components/NavigationDrawer/Info';
import SignOut from "../components/NavigationDrawer/SignOut";
import StatusCount from "../components/NavigationDrawer/StatusCount";
import ClaerTodos from "../components/NavigationDrawer/ClaerTodos";

export class CustomDrawer extends Component {
    render() {
        return (
            <View bg='warmGray.100' h='100%'>

                <Info/>
                <StatusCount/>
                <ClaerTodos navigation={this.props.navigation}/>
                <SignOut/>


            </View>
        );
    }
}

export default CustomDrawer;
