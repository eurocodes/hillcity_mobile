import React, { Component } from 'react';
import { Alert, AsyncStorage, Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Constants from 'expo-constants';
import Entypo from '@expo/vector-icons/Entypo';
// import Icon from 'react-native-vector-icons/FontAwesome';

// import { getUserRole } from '../Backend/Storage';
import { fetchUsersMentor, fetchUsersMentee } from '../Backend/API';
import Loader from '../components/Loader';

const { width, height } = Dimensions.get('window');

export default class UserDetailsScreen extends Component {
    state = {
        data: [],
        role: '',
        loading: false,
    }

    async componentDidMount() {

        const role = await this.getUserRole()

        if (role === "mentor") {
            this.getMentorUserDetails()
            return
        } else if (role === "adminmember") {
            this.getMentorUserDetails()
            return
        }
        this.getMenteeUserDetails()
        return
    }

    // Get user Role
    // getRole = async () => getUserRole("role");
    getUserRole = async () => AsyncStorage.getItem("role");

    getMentorUserDetails = async () => {
        this.setState({ loading: true })
        try {
            const results = await fetchUsersMentor()
            if (results.myConnections && results.myDetails) {
                const data = new Array(results.myDetails);
                this.setState({ data: data, role: "mentor" })
                this.setState({ loading: false })
                return
            }
            this.setState({ err: results })
            alert(this.state.err)
            this.setState({ loading: false })
            return

        } catch (err) {
            console.log(err)
            this.setState({ loading: false })
            this.props.navigation.navigate('Signin');
            return
        }
    }

    getMenteeUserDetails = async () => {
        this.setState({ loading: true })
        try {
            const results = await fetchUsersMentee()
            const data = new Array(results.myDetails);
            this.setState({ data: data, role: "mentee" })
            this.setState({ loading: false })
            return
        } catch (err) {
            console.log(err)
            this.setState({ loading: false })
            this.props.navigation.navigate('Signin');
            return
        }
    }

    renderDetails() {
        return this.state.data.map((val, index) => {
            return (
                <View key={index}>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <View style={styles.appLowerMap}>
                            <View style={{ flexDirection: 'row', marginVertical: 3, marginLeft: 5 }}>
                                <Entypo name='user' size={25} color='#fcc044' />
                                {/* <Text>Photo: {val.photo}</Text> */}
                                <Text style={styles.connectionText}> {`${val.firstName} ${val.lastName}`}</Text>
                            </View>

                            <View style={{ flexDirection: 'row', marginLeft: 5 }}>
                                <Entypo name='mail' size={25} color='#0a6ebd' />
                                <Text style={styles.connectionText}> {val.email}</Text>
                            </View>

                            <View style={{ flexDirection: 'row', width: '95%', marginLeft: 5 }}>
                                <Entypo name='mobile' size={25} color='#0a6ebd' />
                                <Text style={styles.connectionText}> {`${val.phone}`}</Text>
                                <TouchableOpacity style={{ flex: 1, width: '100%', }}>
                                    <Entypo name='edit' color='#0a6ebd' size={25} style={{ alignSelf: 'flex-end', paddingRight: 4, }} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={styles.connectioDivider} />
                </View>
            )
        })
    }

    render() {
        return (
            <View style={{ flex: 1, height: '100%' }}>
                <ScrollView style={styles.mainContainer}>
                    {this.state.loading ? (<View style={styles.loader}><Loader loading={this.state.loading} /></View>) : (<View />)}
                    <View style={styles.appLower}>
                        {this.renderDetails()}
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
        backgroundColor: '#fff',

    },
    appLower: {
        flex: 1,
        alignContent: 'center',
        alignSelf: 'center',
        height: 'auto',
        width: '99%',
        margin: 2,
        marginVertical: 2,
    },
    appLowerMap: {
        margin: 5,
        width: '100%',
    },
    connectionText: {
        fontSize: 15,
        fontFamily: 'sans-serif',
        marginLeft: 10,
        marginVertical: 5,
    },
    connectioDivider: {
        height: 4,
        backgroundColor: '#c1c1c1',
        marginTop: 2,
        marginBottom: 2,
    },
    loader: {
        alignContent: 'center',
        alignSelf: 'center',
    },
})