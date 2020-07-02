import React, { Component } from 'react';
import { Alert, AsyncStorage, Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Constants from 'expo-constants';
import Entypo from '@expo/vector-icons/Entypo';
// import Icon from 'react-native-vector-icons/FontAwesome';

// import { getUserRole } from '../Backend/Storage';
import { fetchUsersMentor, fetchUsersMentee } from '../Backend/API';
import Loader from '../components/Loader';

const { width, height } = Dimensions.get('window');

export default class Dashboard extends Component {
    state = {
        myDetails: '',
        myConnections: [],
        role: '',
        loading: false,
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
        this.setState({loading: true})
        try {
            const results = await fetchUsersMentor()
            if (results.myConnections && results.myDetails) {
                this.setState({ myDetails: results.myDetails, myConnections: results.myConnections, role: "mentor" })
                this.setState({loading: false})
                return
            }
            this.setState({ err: results })
            alert(this.state.err)
            this.setState({loading: false})
            this.props.navigation.navigate('Signin');
            return
            
        } catch (err) {
            console.log(err)
            this.setState({loading: false})
            this.props.navigation.navigate('Signin');
            return
        }
    }

    getMenteeDashboard = async () => {
        this.setState({loading: true})
        try {
            const results = await fetchUsersMentee()
            this.setState({ myDetails: results.myDetails, myConnections: results.myConnections, role: "mentee" })
            this.setState({loading: false})
            return
        } catch (err) {
            console.log(err)
            this.setState({loading: false})
            this.props.navigation.navigate('Signin');
            return
        }
    }

    renderConnection() {
        
        return this.state.myConnections.map((val, index) => {
            return (
                <View  key={index}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={styles.appLowerMap}>
                        <View style={{flexDirection: 'row'}}>
                            <Entypo name='v-card' size={20} />
                        <Text> {`${val.firstName} ${val.lastName}`}</Text>
                        </View>

                        <View style={{flexDirection: 'row'}}>
                            <Entypo name='mail' size={20} />
                        <Text> {val.email}</Text>
                        </View>

                        <View style={{flexDirection: 'row'}}>
                            <Entypo name='mobile' size={20} />
                        <Text> {val.phone}</Text>
                        </View>
                    </View>
                    <View style={styles.appLowerMapPhoto}>
                        <Entypo name='user' size={40} />
                        {/* <Text>Photo: {val.photo}</Text> */}
                    </View>
                </View>
                <View style={styles.connectioDivider} />
                </View>
            )
        })
    }

    render() {
        return (
            <View style={{flex: 1, height}}>
            <ScrollView style={styles.mainContainer}>
                <View style={styles.appTop}>
                    <Text style={styles.topText}>{this.state.myDetails.firstName} {this.state.myDetails.lastName}</Text>
                    {this.state.role === "mentor" ? (<Text style={styles.topText}>You currently have {this.state.myConnections.length} mentee(s) </Text>) : null}
                    <Text style={styles.topText}>Your are doing very well</Text>
                    <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate("Engagements")}>
                        <View >
                            <Text style={styles.buttonText}>View My Engagements</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.appMid}>
                {this.state.role === "mentor" ? (<Text style={styles.appMidText}>My mentees</Text>) :
                    (<Text style={styles.appMidText}>My Mentor's Details</Text>)}
                    </View>
                {this.state.loading ? (<View style={styles.loader}><Loader loading={this.state.loading} /></View>) : (<View />)}
                <View style={styles.appLower}>
                    {this.renderConnection()}
                </View>
            </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        height: '100%',
        width: '100%',
        backgroundColor: '#e5e5e5',

    },
    appTop: {
        flex: 1,
        marginVertical: 2,
        backgroundColor: '#307ecc',
    },
    topText: {
        margin: 2,
        color: '#f8fbfd',
        fontSize: 20,
        fontFamily: 'sans-serif',
    },
    appMid: {
        backgroundColor: '#f2f2f2',
        height: 35,
        alignContent: 'center',
        justifyContent: 'center',
    },
    appMidText: {
        margin: 2,
        fontSize: 20,
        color: '#307ecc',
        alignSelf: 'center',
    },
    appLower: {
        alignContent: 'center',
        alignSelf: 'center',
        height: 'auto',
        width: '99%',
        margin: 2,
        marginVertical: 2,
        backgroundColor: '#807acd',
    },
    appLowerMap: {
        margin: 5,
        width: width * 0.75,
    },
    appLowerMapPhoto: {
        margin: 2,
        width: width * 0.2,
    },
    button: {
        backgroundColor: '#307ecc',
        paddingVertical: 5,
        margin: 5,
        alignSelf: 'flex-end',
    },
    buttonText: {
        color: '#fff',
        fontSize: 20,
        alignSelf: 'center',
        padding: 2,
    },
    connectioDivider: {
        height: 4,
        backgroundColor: '#e2e2e2',
        marginTop: 2,
        marginBottom: 2,
    },
    loader: {
        alignContent: 'center',
        alignSelf: 'center',
    },
})