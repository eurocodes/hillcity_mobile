import React, { Component } from 'react';
import { AsyncStorage, ImageBackground, Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import logo from '../assets/logo.png';
import IMG_2 from '../assets/IMG_20.jpg';

const { width, height } = Dimensions.get('window');

export default class HomeScreen extends Component {

    state = {
        token: null,
    }

    async componentDidMount() {
        const token = await this.getUserToken()
        this.setState({ token: token })
    }

    signinScreen = () => {
        if (this.state.token === null) {
            this.props.navigation.navigate('Signin');
            return
        }
        this.props.navigation.navigate('Main');
    }

    // Get user token
    getUserToken = async () => AsyncStorage.getItem("token");

    render() {
        return (
            <View style={styles.mainContainer}>
                <ImageBackground
                    style={{ alignSelf: 'center', justifyContent: 'center', height: '100%', width: '100%' }}
                    source={IMG_2}>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
                        <Image source={logo} style={{ width: width * 0.3, height: height * 0.08, marginBottom: height / 4, }} />
                        <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: height / 4, }}>
                            <Text style={{ color: '#fff' }}>HILLCITY MENTORSHIP On Mobile</Text>
                            <Text style={{ color: '#fff' }}>Adding value to lives</Text>
                        </View>
                    </View>
                    <View>
                        <TouchableOpacity style={styles.button} onPress={this.signinScreen} >
                            <View>
                                <Text style={styles.buttonText}>Enter To Continue</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{ height: 'auto' }}>
                        <Text style={{ alignSelf: 'center', color: '#fff' }}>Quick Contact</Text>
                    </View>
                </ImageBackground>
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
        backgroundColor: '#000000',
        alignSelf: 'center',
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 20,
        margin: 5,
        width: '80%',
        marginBottom: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 20,
        alignSelf: 'center'
    }
})