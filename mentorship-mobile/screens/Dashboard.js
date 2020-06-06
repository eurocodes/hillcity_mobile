import React, { Component } from 'react';
import { Button, Dimensions, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const { width, height } = Dimensions.get('window');

export default class Dashboard extends Component {

    render() {
        return (
            <View>
                <Text>You are logged in</Text>
            </View>
        )
    }
}