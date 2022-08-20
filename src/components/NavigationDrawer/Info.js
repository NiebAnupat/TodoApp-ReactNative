import React, {Component} from 'react';
import {View, Text, Avatar, HStack} from 'native-base';
import auth from '@react-native-firebase/auth';


export class Info extends Component {


    render() {
        let name = null
        let photoURL = null
        if (auth().currentUser) {
            name = auth().currentUser.displayName || auth().currentUser.email;
            if(name.includes(' ')){
                name = name.split(' ');
                photoURL = `https://ui-avatars.com/api/?name=${name[0]}+${name[1]}&background=fff`
            }else photoURL = `https://ui-avatars.com/api/?name=${name}&background=fff`
        }else{
            name = 'Guest'
            photoURL = null
        }
        {
            return (
                <View bg="indigo.800" h="100" p="5">
                    <HStack my={'auto'}>
                        <Avatar
                            size='md'
                            source={{uri: photoURL}}
                        >
                            {photoURL ? null : 'Guest'}
                        </Avatar>
                        <Text my='auto' ml={3.5} color={"white"} fontSize={17} fontWeight={600}>{name}</Text>
                    </HStack>
                </View>);
        }
    }
}

export default Info;
