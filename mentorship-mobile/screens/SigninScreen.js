import React, { Component } from 'react';
import { Dimensions, Image, ImageBackground, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Constants from 'expo-constants'
import Feather from '@expo/vector-icons/Feather';

import { setUserToken, setName, setUserRole } from '../Backend/Storage';
import logo from '../assets/logo.png';
import IMG_2 from '../assets/IMG_20.jpg';
import Mentoring from '../assets/IMG-MENTOR.jpg';
import Loader from '../components/Loader';

const { width, height } = Dimensions.get('window');
const baseUrl = "https://hillcityapp.herokuapp.com";

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
            const response = await fetch(`${baseUrl}/api/v1/auth/login`, {
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
                    style={{ padding: 0, margin: 0, alignSelf: 'flex-start', height: height * 0.4, width }}
                    source={Mentoring}>

                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
                        <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: '30%', }}>
                            <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}>HILLCITY MENTORSHIP On Mobile</Text>
                            <Text style={{ color: '#fff' }}>Adding value to lives</Text>
                        </View>
                    </View>

                </ImageBackground>
                <View style={{ paddingTop: '20%', alignContent: 'center', justifyContent: 'center', width: '100%', }} >


                    <KeyboardAvoidingView >
                        {this.state.loading ? (<View style={styles.loader}><Loader loading={this.state.loading} /></View>) : (<View />)}

                        <View style={styles.inputField}>
                            <Feather name="mail" size={20} color='#aaa' />
                            <TextInput style={styles.inputTextArea}
                                placeholder='Email Address'
                                onChangeText={this.handleInput('email')}
                                value={this.state.email}
                                autoCapitalize='none'
                                underlineColorAndroid='transparent' />
                        </View>
                        <Text style={styles.errText}>{this.state.noEmail}</Text>

                        <View style={styles.inputField}>
                            <Feather name="key" size={20} color='#aaa' />
                            <TextInput style={styles.inputTextArea}
                                placeholder='Password'
                                onChangeText={this.handleInput('password')}
                                value={this.state.password}
                                autoCapitalize='none'
                                secureTextEntry
                                underlineColorAndroid='transparent' />
                            <Feather name="eye" size={20} color='#aaa' />
                        </View>
                        <Text style={styles.errText}>{this.state.noPassword}</Text>

                        <TouchableOpacity style={styles.button} onPress={this.signin} >
                            <View>
                                <Text style={styles.buttonText}>Sign in</Text>
                            </View>
                        </TouchableOpacity>

                    </KeyboardAvoidingView>
                    <View style={{ flexDirection: 'row', marginTop: 5, alignContent: 'center', justifyContent: 'center', width: '100%', }}>
                        <Text style={{ alignSelf: 'center', }}>Forgot Password?</Text>
                        <TouchableOpacity style={{ alignSelf: 'center', marginLeft: 5, }}>
                            <Text style={{ color: 'blue', }}>Click here!</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        backgroundColor: '#fff',
        paddingTop: Constants.statusBarHeight,
        height,
        width: '100%',
    },
    inputField: {
        height: 35,
        borderColor: '#aaa',
        borderBottomWidth: 2,
        marginTop: 10,
        marginBottom: 0,
        paddingLeft: 15,
        marginHorizontal: 10,
        flexDirection: 'row',
    },
    inputTextArea: {
        color: '#000',
        width: '100%',
        paddingLeft: 10,
        marginBottom: 4,
    },
    button: {
        backgroundColor: '#2859b8',
        paddingHorizontal: 0,
        borderRadius: 5,
        marginHorizontal: 15,
        marginVertical: height * 0.1,
    },
    buttonText: {
        color: '#fff',
        fontSize: 20,
        alignSelf: 'center',
        marginVertical: 10,
    },
    loader: {
        alignContent: 'center',
        alignSelf: 'center',
    },
    errText: {
        color: 'red',
        fontSize: 15,
        marginTop: 0,
        marginLeft: 20,
    }
})