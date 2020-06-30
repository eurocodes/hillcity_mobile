import React, { Component } from 'react';
import { AsyncStorage, Dimensions, ScrollView, StyleSheet, Text, View, } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Constants from 'expo-constants';

const { width, height } = Dimensions.get('window');

export default class ManageEngagementsScreen extends Component {
    render() {
        return (
            <View>
                <Text>This is Engagements Screen</Text>
            </View>
        )
    }
}