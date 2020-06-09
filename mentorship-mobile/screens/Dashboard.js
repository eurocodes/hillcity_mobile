import React, { Component } from 'react';
import { AsyncStorage, Button, Dimensions, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { fetchUsers } from '../Backend/API'
import { getUserToken } from '../Backend/Storage';

const { width, height } = Dimensions.get('window');

export default class Dashboard extends Component {

    state = {
        myData: '',
        myConnections: '',
    }

    async componentDidMount() {
        const role = await this.getUserRole()
        console.log("My Role:", role);

        if (role === "mentor") {
            this.getMentorDashboard()
            return
        }
        this.getMenteeDashboard()
        return
    }

    // Get user Role
    getUserRole = async () => AsyncStorage.getItem("role");

    // getToken = async () => getUserToken();
    getToken = async () => AsyncStorage.getItem("token");
    // Please use AsyncStorage or SecureStorage API
    getMenteeDashboard = async () => {
        const token = await this.getToken()
        console.log("My token:", token)
        const response = await fetch("http://localhost:3400/api/v1/auth/mentee/dashboard", {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "content-type": "application/json",
                "Authorization": token
            }
        })
        const results = await response.json()
        console.log(results);
        if (response.ok) {
            this.setState({ myData: results.data.myDetails, myConnections: results.data.myConnections })
            console.log("State:", this.state)
            return
        }
        this.setState({ err: "Failed" })
        console.log(this.state)
        return
    }

    getMentorDashboard = async () => {
        const token = await this.getToken()
        console.log("My token:", token)
        const response = await fetch("http://localhost:3400/api/v1/auth/mentor/dashboard", {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "content-type": "application/json",
                "Authorization": token
            }
        })
        const results = await response.json()
        console.log(results);
        if (response.ok) {
            this.setState({ myData: results.data.myDetails, myConnections: results.data.myConnections })
            console.log("State:", this.state)
            return
        }
        this.setState({ err: "Failed" })
        console.log(this.state)
        return
    }

    render() {
        return (
            <View>
                <Text>You are logged in as {this.state.myData.firstName}</Text>
            </View>
        )
    }
}