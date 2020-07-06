import React from 'react';
import { Image, View, TouchableOpacity } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';

const NavigationDrawerHeader = props => {
    const toggleDrawer = () => {
        props.navigationProps.toggleDrawer();
    }

    return (
        <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity onPress={toggleDrawer}>
                <Entypo
                    name='menu' size={40}
                />
            </TouchableOpacity>
        </View>
    )
}

export default NavigationDrawerHeader;