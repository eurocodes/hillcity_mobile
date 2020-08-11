import React from 'react';
import { Image, View, TouchableOpacity, Dimensions } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';

const { width } = Dimensions.get('window');

const NavigationDrawerHeader = props => {
    const toggleDrawer = () => {
        props.navigationProps.toggleDrawer();
    }

    const notifications = () => {
        props.navigationProps.navigate('Notifications');
    }

    return (
        <View style={{ flexDirection: 'row', width }}>
            <TouchableOpacity onPress={toggleDrawer}>
                <Entypo
                    name='menu' size={40} color='#307ecc'
                />
            </TouchableOpacity>
            <TouchableOpacity style={{ position: 'absolute', right: 20, marginVertical: 5, }}
                onPress={notifications}>
                <Entypo name='bell' size={25} color='#307ecc' />
            </TouchableOpacity>
        </View>
    )
}

export default NavigationDrawerHeader;