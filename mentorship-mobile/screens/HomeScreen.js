import React, { Component } from 'react';
import { Button, Dimensions, Image, StyleSheet, Text, View } from 'react-native';

import logo from '../assets/logo.png';

const { width, height } = Dimensions.get('window');

export default class HomeScreen extends Component {

    signin = () => {

    }

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff', height, width }}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
                    <Image source={logo} style={{ width: width * 0.3, height: height * 0.08, marginBottom: height / 4, }} />
                    <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: height / 4, }}>
                        <Text>HILLCITY MENTORSHIP On Mobile</Text>
                        <Text>Adding value to lives</Text>
                    </View>
                </View>
                <View>
                    <View style={{ width: width - 30, marginBottom: 20, }}>
                        <Button title="Sign in" color='#1f1526' onPress={this.signin}></Button>
                    </View>
                </View>
                <View>
                    <Text style={{ flex: 1, alignSelf: 'flex-start' }}>Visit our website</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    signinButton: {
        flex: 1,
        justifyContent: 'center',
        width: 300,
    }
})