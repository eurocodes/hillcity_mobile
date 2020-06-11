import React, { Component } from 'react';
import { Dimensions, Image, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { setUserToken, setUserRole } from '../Backend/Storage';

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

        if (this.state.email && this.state.password) {
            const response = await fetch("http://localhost:3400/api/v1/auth/login", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ email: this.state.email, password: this.state.password })
            })
            const results = await response.json()
            console.log(results);
            if (response.ok) {
                setUserToken(results.data.token)
                setUserRole(results.data.role)
                this.props.navigation.navigate('Main');
                return
            }
            this.props.navigation.navigate('Signin');
        }
        !this.state.email ? this.setState({ noEmail: "Email address field cannot be empty" }) : this.setState({ noEmail: "" })
        !this.state.password ? this.setState({ noPassword: "Password field cannot be empty" }) : this.setState({ noPassword: "" })
    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.mainContainer}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
                    <Image source={logo} style={{ width: width * 0.3, height: height * 0.08, marginBottom: height / 4, }} />
                    <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: height / 4, }}>
                        <Text>HILLCITY MENTORSHIP On Mobile</Text>
                        <Text>Adding value to lives</Text>
                    </View>
                </View>
                <View style={{ width: width - 30, marginBottom: 20, }}>
                    <Text style={styles.errText}>{this.state.noEmail}</Text>
                    <TextInput style={styles.inputField}
                        placeholder='Email Address'
                        onChangeText={this.handleInput('email')}
                        value={this.state.email}
                        autoCapitalize='none' />

                    <Text style={styles.errText}>{this.state.noPassword}</Text>
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
            </KeyboardAvoidingView>
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
        marginTop: 0,
        marginBottom: 10,
        marginHorizontal: 10,
    },
    button: {
        backgroundColor: '#2859b8',
        paddingVertical: 5,
        paddingHorizontal: 0,
        borderRadius: 20,
        margin: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 20,
        alignSelf: 'center'
    },
    errText: {
        color: '#f00',
        fontSize: 12,
        marginBottom: 0,
        marginLeft: 20,
    }
})