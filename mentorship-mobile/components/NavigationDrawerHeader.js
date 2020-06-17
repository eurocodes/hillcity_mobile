import React from 'react';
import { Image, View, TouchableOpacity } from 'react-native';
import drawer from '../assets/drawerWhite.png';

const NavigationDrawerHeader = props => {
    const toggleDrawer = () => {
        props.navigationProps.toggleDrawer();
    }

    return (
        <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity onPress={toggleDrawer}>
                <Image
                    source={drawer}
                    style={{ width: 20, height: 25, marginLeft: 5, }}
                />
            </TouchableOpacity>
        </View>
    )
}

export default NavigationDrawerHeader;