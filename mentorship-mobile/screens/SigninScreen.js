import React, { Component } from 'react';
import {
    Dimensions, Image,
    ImageBackground, StyleSheet,
    Text, TextInput, TouchableOpacity,
    View, Alert, StatusBar,
    SafeAreaView
} from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import * as Animatable from 'react-native-animatable';

import { setUserToken, setName, setUserRole } from '../Backend/Storage';
import logo from '../assets/logo.png';
import Mentoring from '../assets/mentoring.jpeg';
import Loader from '../components/Loader';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import SocialButton from '../components/SocialButton';

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
        if (key === 'email') {
            this.setState({ noEmail: null, })
        }
        else {
            this.setState({ noPassword: null })
        }
    }

    signin = async () => {

        if (this.state.email && this.state.password) {
            const response = await fetch(`${baseUrl}/api/v1/auth/login`, {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ email: this.state.email, password: this.state.password })
            })
            this.setState({ loading: true })
            const results = await response.json();
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
            Alert.alert("Access Denied", this.state.err, [
                { text: "OKAY" }
            ]);
            this.setState({ loading: false, email: '', password: '', })
            this.props.navigation.navigate('Signin');
            return
        }
        !this.state.email ? this.setState({ noEmail: "Please enter email" }) : this.setState({ noEmail: "" })
        !this.state.password ? this.setState({ noPassword: "Please enter password" }) : this.setState({ noPassword: "" })
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar backgroundColor='#252757' barStyle='light-content' />
                <Image
                    style={styles.logo}
                    source={require("../assets/logo.png")}
                />

                <Text style={styles.text}>HillCity Mentorship</Text>
                {this.state.loading ? (<View style={styles.loader}><Loader loading={this.state.loading} /></View>) : (<View />)}

                <FormInput
                    onChangeText={this.handleInput('email')}
                    labelValue={this.state.email}
                    placeholderText="Email"
                    iconType="user"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                />
                {this.state.noEmail ? <Animatable.View animation='fadeInLeft' duration={500}>
                    <Text style={styles.errText}>{this.state.noEmail}</Text>
                </Animatable.View> : <View />}

                <FormInput
                    onChangeText={this.handleInput('password')}
                    labelValue={this.state.password}
                    placeholderText="Password"
                    iconType="lock"
                    secureTextEntry={true}
                />
                {this.state.noPassword ? <Animatable.View animation='fadeInLeft' duration={500}>
                    <Text style={styles.errText}>{this.state.noPassword}</Text>
                </Animatable.View> : <View />}

                <FormButton
                    buttonTitle="Sign In"
                    onPress={this.signin}
                />

                <TouchableOpacity
                    onPress={() => { }}
                    style={styles.forgotButton}>
                    <Text style={styles.navButtonText}>Forgot Password</Text>
                </TouchableOpacity>

                {/* <SocialButton
                    buttonTitle="Sign In with Facebook"
                    btnType="facebook"
                    color="#4867aa"
                    backgroundColor="#e6eaf4"
                    onPress={() => { }}
                />

                <SocialButton
                    buttonTitle="Sign In with Google"
                    btnType="google"
                    color="#de4d41"
                    backgroundColor="#f5e7ea"
                    onPress={() => { }}
                /> */}

            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        backgroundColor: '#fff',
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
        marginBottom: 10,
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
    },

    // Nwe style
    container: {
        backgroundColor: '#f9fafd',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    logo: {
        height: 75,
        width: 120,
        resizeMode: 'cover',
    },
    text: {
        // fontFamily: 'Kufam-SemiBoldItalic',
        fontSize: 28,
        marginBottom: 10,
        color: '#051d5f',
    },
    navButton: {
        marginTop: 15,
    },
    forgotButton: {
        marginVertical: 35,
    },
    navButtonText: {
        fontSize: 18,
        fontWeight: '500',
        color: '#2e64e5',
        // fontFamily: 'Lato-Regular',
    },
})