import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';


export default class NotificationScreen extends Component {

    render() {

        return (
            <View
                style={styles.mainContainer}>
                <TouchableOpacity style={styles.notificationsContainer}>
                    <Text style={styles.title}>New Notification sample </Text>
                    <Text>Notification sample body</Text>
                    <Text>Notification sample data</Text>
                </TouchableOpacity>
                <View style={styles.notificationsDiv} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        justifyContent: 'space-around',
    },
    notificationsContainer: {
        justifyContent: 'flex-start',
        marginHorizontal: 20,
        marginVertical: 5,
    },
    title: {
        fontFamily: 'sans-serif',
        fontSize: 20,
        color: '#307ecc'
    },
    notificationsDiv: {
        height: 1,
        marginLeft: 2,
        backgroundColor: '#aaa',
        marginTop: 2,
        marginBottom: 2,
    },
})