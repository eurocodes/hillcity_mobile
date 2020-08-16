import React, { Component } from 'react';
import { AsyncStorage, Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import logo from '../assets/logo.png';
import Loader from '../components/Loader';
import { ActivityIndicator } from 'react-native-paper';

const { width, height } = Dimensions.get('window');

export default class SplashScreen extends Component {

    state = {
        token: null,
        role: null,
        loading: false,
        animating: true,
    }

    async componentDidMount() {
        const token = await this.getUserToken()
        const role = await this.getUserRole()
        this.setState({ token, role, })

        setTimeout(() => {
            this.setState({ animating: false, loading: true })
            //Check if user is signed in
            //If not then send to login
            //else send to Dashboard Screen
            if (this.state.token === null) {
                this.props.navigation.navigate('Signin');
                this.setState({ loading: false })
                return
            } else if (this.state.role === "adminmember") {
                this.props.navigation.navigate('Admin');
                this.setState({ loading: false })
                return
            }
            this.props.navigation.navigate('Main');
            this.setState({ loading: false })
        }, 5000);
    }

    // Get user token
    getUserToken = async () => AsyncStorage.getItem("token");
    getUserRole = async () => AsyncStorage.getItem("role");

    render() {
        return (
            <View style={styles.mainContainer}>
                <Image
                    source={logo}
                    style={{ width: '90%', resizeMode: 'contain', margin: 30 }}
                />
                {this.state.loading ? (<View style={styles.loader}><Loader loading={this.state.loading} /></View>) : (<View />)}
                <ActivityIndicator
                    animating={this.state.animating}
                    color='#fff'
                    size='large'
                    style={styles.activityIndicator}
                />
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
    },
    loader: {
        alignContent: 'center',
        alignSelf: 'center',
        marginBottom: 10,
    },
    activityIndicator: {
        alignItems: 'center',
        height: 80,
    },
})