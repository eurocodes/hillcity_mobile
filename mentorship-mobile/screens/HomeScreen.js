import React, { Component } from 'react';
import { Button, Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import logo from '../assets/logo.png';

const { width, height } = Dimensions.get('window');

export default class HomeScreen extends Component {

    signinScreen = () => {
        this.props.navigation.navigate('Signin');
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
                    <Image source={logo} style={{ width: width * 0.3, height: height * 0.08, marginBottom: height / 4, }} />
                    <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: height / 4, }}>
                        <Text>HILLCITY MENTORSHIP On Mobile</Text>
                        <Text>Adding value to lives</Text>
                    </View>
                </View>
                <View>
                    <TouchableOpacity onPress={this.signinScreen} >
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>Enter To Continue</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View>
                    <Text style={{ flex: 1, alignSelf: 'flex-start' }}>Visit our website</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        height, width
    },
    button: {
        backgroundColor: '#1f1526',
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 20,
        margin: 5,
        width: width - 30,
        marginBottom: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 20,
        alignSelf: 'center'
    }
})