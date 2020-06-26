import React, { Component } from 'react';
import { Dimensions, Image, ImageBackground, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Constants from 'expo-constants'
import { setUserToken, setName, setUserRole } from '../Backend/Storage';

import logo from '../assets/logo.png';
import IMG_2 from '../assets/IMG_20.jpg';
import Loader from '../components/Loader';

const { width, height } = Dimensions.get('window');

export default class SigninScreen extends Component {

    state = {
        email: '',
        password: '',
        loading: false,
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
            this.setState({ loading: true })
            const results = await response.json()
            console.log(results);
            if (response.ok) {
                setUserToken(results.data.token)
                setName(results.data.name)
                setUserRole(results.data.role)
                if (results.data.role === "adminmember") {
                    this.props.navigation.navigate("Admin")
                    return
                }
                this.props.navigation.navigate('Main');
                this.setState({ loading: false })
                return
            }
            this.setState({ err: results.message })
            alert(this.state.err)
            this.setState({ loading: false, email: '', password: '', })
            this.props.navigation.navigate('Signin');
            return
        }
        !this.state.email ? this.setState({ noEmail: "Please enter email" }) : this.setState({ noEmail: "" })
        !this.state.password ? this.setState({ noPassword: "Please enter password" }) : this.setState({ noPassword: "" })
    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.mainContainer}>
                <ImageBackground
                    style={{ alignSelf: 'center', justifyContent: 'center', height: '100%', width: '100%' }}
                    source={IMG_2}>
                    <View style={{ alignSelf: 'center', alignContent: 'center', justifyContent: 'center', width: '100%' }} >
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
                            <Image source={logo} style={{ width: width * 0.3, height: height * 0.08, marginBottom: 10, }} />
                            <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: '35%', }}>
                                <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}>HILLCITY MENTORSHIP On Mobile</Text>
                                <Text style={{ color: '#fff' }}>Adding value to lives</Text>
                            </View>
                        </View>
                        <View style={{ width: '100%', marginBottom: '5%', marginTop: '40%' }}>
                            {this.state.loading ? (<View style={styles.loader}><Loader loading={this.state.loading} /></View>) : (<View />)}
                            <TextInput style={styles.inputField}
                                placeholder='Email Address'
                                onChangeText={this.handleInput('email')}
                                value={this.state.email}
                                autoCapitalize='none' />
                            <Text style={styles.errText}>{this.state.noEmail}</Text>

                            <TextInput style={styles.inputField}
                                placeholder='Password'
                                onChangeText={this.handleInput('password')}
                                value={this.state.password}
                                autoCapitalize='none'
                                secureTextEntry />
                            <Text style={styles.errText}>{this.state.noPassword}</Text>

                            <TouchableOpacity style={styles.button} onPress={this.signin} >
                                <View>
                                    <Text style={styles.buttonText}>Sign in</Text>
                                </View>
                            </TouchableOpacity>

                        </View>
                        <View style={{ height: 'auto', marginTop: '5%', }}>
                            <Text style={{ alignSelf: 'center', color: '#fff' }}>Forgot Password? Click here!</Text>
                        </View>
                    </View>
                </ImageBackground>
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
        paddingTop: Constants.statusBarHeight,
        height: '100%',
        width: '100%',
    },
    inputField: {
        height: 35,
        color: '#fff',
        borderColor: '#fff',
        borderWidth: 2,
        borderRadius: 20,
        marginTop: 10,
        marginBottom: 0,
        paddingLeft: 15,
        marginHorizontal: 10,
    },
    button: {
        backgroundColor: '#2859b8',
        paddingVertical: 5,
        paddingHorizontal: 0,
        borderRadius: 20,
        margin: 10,
        marginTop: 50,
    },
    buttonText: {
        color: '#fff',
        fontSize: 20,
        alignSelf: 'center'
    },
    loader: {
        alignContent: 'center',
        alignSelf: 'center',
    },
    errText: {
        color: '#fff',
        fontSize: 15,
        marginTop: 0,
        marginLeft: 20,
    }
})