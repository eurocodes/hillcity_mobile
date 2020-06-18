import React, { Component } from 'react';
import { AsyncStorage, Dimensions, ScrollView, StyleSheet, Text, View, } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Constants from 'expo-constants';

const { width, height } = Dimensions.get('window');
import { fetchUsersMentor } from '../Backend/API';

const getUserName = async () => AsyncStorage.getItem("name")

export default class AdminPanel extends Component {

    state = {
        name: '',
        mentees: [],
    }

    async componentDidMount() {
        const name = await getUserName()
        this.setState({ name })
        this.getAdminDashboard()
        return
    }

    getAdminDashboard = async () => {
        try {
            const results = await fetchUsersMentor()
            if (results.myConnections) {
                this.setState({ mentees: results.myConnections })
                console.log("STATE:", this.state)
                return
            }
            this.setState({ mentees: [results] })
            console.log("STATE Ugee:", this.state)
            return

        } catch (err) {
            console.log(err)
            return
        }
    }

    renderMentees() {
        return this.state.mentees.map((val, index) => {
            if (!val.firstName) {
                return (
                    <View>
                        <Text>{val}</Text>
                    </View>
                )
            }
            return (
                <View key={index} >
                    <View style={styles.appLowerMap}>
                        <View style={{ flexDirection: 'row' }}>
                            <View>
                                <Text>Name: {`${val.firstName} ${val.lastName}`}</Text>
                                <Text>Email Address: {val.email}</Text>
                                <Text>Phone: {val.phone}</Text>
                            </View>
                            <View >
                                <Text>{val.photo}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.connectionDivider} />
                </View>
            )
        })
    }

    render() {
        return (
            <View style={{ flex: 1, height, }}>
                <ScrollView style={styles.mainContainer}>
                    <View style={styles.topDesc}>
                        <Text style={styles.topDescText}>{this.state.name}, </Text>
                        <Text style={styles.topDescText}>Welcome to Admin dashboard, you can manage people and other activities from here</Text>
                    </View>

                    <View />

                    <View style={styles.bothButtonContainer}>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity onPress={() => alert("Module not yet completed")}>
                                <Text style={styles.buttonText}>Manage Mentors</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity onPress={() => alert("Module not yet completed")}>
                                <Text style={styles.buttonText}>Manage Mentees</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.midTextContainer}>
                        <Text style={styles.midText}>My Mentees</Text>
                    </View>

                    <View style={styles.mentees}>
                        {this.renderMentees()}
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        paddingTop: Constants.statusBarHeight,
        height,
        width: '100%',
        backgroundColor: '#e5e5e5'
    },
    topDesc: {
        alignContent: 'flex-start',
        margin: 2,
        backgroundColor: '#307ecc',
        height: 'auto',
    },
    topDescText: {
        fontFamily: 'sans-serif',
        fontSize: 20,
        color: '#fff',
        margin: 2,
    },
    bothButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#f2f2f2',
        margin: 5,
        height: 35,
    },
    buttonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#307ecc',
        width: '50%',
        margin: 2,
    },
    buttonText: {
        flex: 1,
        alignSelf: 'center',
        color: '#fff',
        fontSize: 15,
    },
    midTextContainer: {
        height: 35,
        backgroundColor: '#b2b2b2',
        marginHorizontal: 2,
        marginVertical: 5,
        alignContent: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    midText: {
        fontSize: 15,
        alignSelf: 'center',
        color: '#307ecc',
    },
    mentees: {
        alignContent: 'flex-start',
        marginVertical: 5,
        marginHorizontal: 2,
        height: '100%',
        width: '99%',
        backgroundColor: '#f8fbfd',
    },
    appLowerMap: {
        margin: 5,
        width: '50%',
    },
    connectionDivider: {
        height: 1,
        width: '100%',
        marginLeft: 5,
        backgroundColor: '#e2e2e2',
        marginTop: 2,
        marginBottom: 2,
    },
})