import React, { Component } from 'react';
import { Button, Dimensions, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { login } from '../Backend/API';
import logo from '../assets/logo.png';

const { width, height } = Dimensions.get('window');

export default class SigninScreen extends Component {

    state = {
        email: '',
        password: '',
    }

    handleInput = key => val => {
        this.setState({ [key]: val })
    }

    signin = async () => {
        try {
            await login(this.state.email, this.state.password)
            this.props.navigation.navigate('Main');
        } catch (err) {
            const errMessage = err.message
            this.setState({ err: errMessage })
        }
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
                <View style={{ width: width - 30, marginBottom: 20, }}>
                    <TextInput style={styles.inputField}
                        placeholder='Email Address'
                        onChangeText={this.handleInput('email')}
                        value={this.state.email}
                        autoCapitalize='none' />

                    <TextInput style={styles.inputField}
                        placeholder='Password'
                        onChangeText={this.handleInput('password')}
                        value={this.state.password}
                        autoCapitalize='none'
                        secureTextEntry />

                    <TouchableOpacity onPress={this.signin} >
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>Sign in</Text>
                        </View>
                    </TouchableOpacity>

                </View>
                <View>
                    <Text style={{ flex: 1, alignSelf: 'flex-start' }}>Forgot Password? Click here!</Text>
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
    inputField: {
        height: 35,
        borderColor: '#2859b8',
        borderWidth: 1,
        borderRadius: 20,
        margin: 5
    },
    button: {
        backgroundColor: '#2859b8',
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 20,
        margin: 5
    },
    buttonText: {
        color: '#fff',
        fontSize: 20,
        alignSelf: 'center'
    }
})