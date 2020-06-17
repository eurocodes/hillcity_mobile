import React, { Component } from 'react';
import { Alert, AsyncStorage, Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Constants from 'expo-constants';

// import { getUserRole } from '../Backend/Storage';
import { fetchUsersMentor, fetchUsersMentee } from '../Backend/API';

const { width, height } = Dimensions.get('window');

export default class Dashboard extends Component {
    state = {
        myDetails: '',
        myConnections: [],
        role: '',
    }

    async componentDidMount() {
        const role = await this.getUserRole()
        console.log("My Role:", role);

        if (role === "mentor") {
            this.getMentorDashboard()
            return
        } else if (role === "adminmember") {
            this.getMentorDashboard()
            return
        }
        this.getMenteeDashboard()
        return
    }

    // Get user Role
    // getRole = async () => getUserRole("role");
    getUserRole = async () => AsyncStorage.getItem("role");

    getMentorDashboard = async () => {
        try {
            const results = await fetchUsersMentor()
            if (results.myConnections && results.myDetails) {
                this.setState({ myDetails: results.myDetails, myConnections: results.myConnections, role: "mentor" })
                return
            }
            this.setState({ err: results })
            alert(this.state.err)
            this.props.navigation.navigate('Signin');
            return
            
        } catch (err) {
            console.log(err)
            this.props.navigation.navigate('Signin');
            return
        }
    }

    getMenteeDashboard = async () => {
        try {
            const results = await fetchUsersMentee()
            this.setState({ myDetails: results.myDetails, myConnections: results.myConnections, role: "mentee" })
            return
        } catch (err) {
            console.log(err)
            this.props.navigation.navigate('Signin');
            return
        }
    }

    renderConnection() {
        return this.state.myConnections.map((val, index) => {
            return (
                <View>
                <View style={{ flexDirection: 'row' }} key={index}>
                    <View style={styles.appLowerMap}>
                        <Text>Name: {`${val.firstName} ${val.lastName}`}</Text>
                        <Text>Email Address: {val.email}</Text>
                        <Text>Phone: {val.phone}</Text>
                    </View>
                    <View style={styles.appLowerMap}>
                        <Text>Photo: {val.photo}</Text>
                    </View>
                </View>
                <View style={styles.connectioDivider} />
                </View>
            )
        })
    }

    render() {
        return (
            <ScrollView>
                <View style={{ backgroundColor: '#b3cde0', height: 1}}>
                <View style={styles.appTop}>
                    <Text style={styles.topText}>{this.state.myDetails.firstName} {this.state.myDetails.lastName}</Text>
                    {this.state.role === "mentor" ? (<Text style={styles.topText}>You currently have {this.state.myConnections.length} mentee(s) </Text>) : null}
                    <Text style={styles.topText}>Your are doing very well</Text>
                    <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate("Engagements")}>
                        <View >
                            <Text style={styles.buttonText}>My Engagements</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                {this.state.role === "mentor" ? (<Text style={styles.appMid}>Here are your mentees</Text>) :
                    (<Text style={styles.appMid}>Your Mentor's Details</Text>)}
                <View style={styles.appLower}>
                    {this.renderConnection()}
                </View>
                {/* <ScrollViewConnection
                    myConnections={this.props.myConnections} /> */}
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    appTop: {
        paddingTop: Constants.statusBarHeight,
        alignContent: 'center',
        alignSelf: 'center',
        height: 'auto',
        width: '100%',
        margin: 2,
        marginTop: 2,
        borderRadius: 10,
        backgroundColor: '#f8fbfd',
    },
    topText: {
        margin: 2,
    },
    appMid: {
        marginLeft: '5%',
        fontSize: '75%',
        color: '#307ecc',
    },
    appLower: {
        alignContent: 'center',
        alignSelf: 'center',
        height: 'auto',
        width: '100%',
        margin: 2,
        marginBottom: 2,
        borderRadius: 10,
        backgroundColor: '#f8fbfd',
    },
    appLowerMap: {
        margin: 5,
        width: width * 0.5,
    },
    button: {
        backgroundColor: '#307ecc',
        paddingVertical: 5,
        paddingHorizontal: 0,
        borderRadius: 20,
        margin: 5,
        alignSelf: 'flex-end',
    },
    buttonText: {
        color: '#fff',
        fontSize: 12,
        alignSelf: 'center',
        padding: 2,
    },
    connectioDivider: {
        height: 1,
        marginLeft: 12,
        backgroundColor: '#e2e2e2',
        marginTop: 2,
        marginBottom: 2,
    },
})