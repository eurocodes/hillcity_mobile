import React, { Component } from 'react';
import { AsyncStorage, Dimensions, RefreshControl, ScrollView, StyleSheet, Text, View, } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Constants from 'expo-constants';
import Entypo from '@expo/vector-icons/Entypo';

import { setEngID } from '../Backend/Storage';
const { width, height } = Dimensions.get('window');
import { fetchEngagementsMentor } from '../Backend/API';
import Loader from '../components/Loader';

const getUserName = async () => AsyncStorage.getItem("name")

export default class AdminPanel extends Component {

    state = {
        engagements: [],
        role: "",
        loading: false,
        refreshing: true,
    }

    async componentDidMount() {
        const name = await getUserName()
        this.setState({ name })
        this.getAdminDashboard()
        this.setState({ refreshing: false })
        return
    }

    refreshScreen = async () => {
        const name = await getUserName()
        this.setState({ name })
        this.getAdminDashboard()
        this.setState({ refreshing: false })
        return
    }

    getAdminDashboard = async () => {
        this.setState({ loading: true })
        try {
            const results = await fetchEngagementsMentor()
            if (results[0]) {
                this.setState({ engagements: results, role: "mentor" })
                this.setState({ loading: false })
                return
            } else {
                this.setState({ engagements: "You don't have any engagements", role: "mentor" })
                this.setState({ loading: false })
            }
        } catch (err) {
            this.setState({ loading: false })
            console.log(err)
            return
        }
    }

    renderEngagements() {
        if (this.state.engagements === "You don't have any engagements") {
            return (
                <View style={styles.mapContainerMentor}>
                    <Text>{this.state.engagements}</Text>
                </View>
            )
        }
        return this.state.engagements.map((val, index) => {
            return (
                <View key={val.engagement_ID}>
                    <View style={{ flexDirection: 'row', backgroundColor: '#aaa' }}>
                        <View style={{ height: '30%', width: '12%', marginLeft: 5, alignSelf: 'center', }}>
                            {/* <Text style={{ height: 40, width: 75 }}>{val.photo}</Text> */}
                            <Entypo name='user' size={40} />
                        </View>
                        <View style={styles.mapContainerMentor}>
                            <Text style={{ marginLeft: 8 }}>{`${val.First_Name} ${val.Last_Name}`}</Text>
                            <Text style={{ marginLeft: 8 }}>Engagement Type: {val.engagement_type}</Text>
                            <Text style={{ marginLeft: 8 }}>Reason for Engagement: {`${val.reason_for_engagement.slice(0, 20)}...`}</Text>
                            <Text style={{ marginLeft: 8 }}>Status: {val.status}</Text>
                            <Text style={{ marginLeft: 8 }}>Proposed date & time: {`${val.proposed_date} at ${val.proposed_time}`}</Text>
                            <TouchableOpacity style={{ marginLeft: 8, width: '25%', }} onPress={() => this.props.navigation.navigate("SingleEngagement", setEngID(val.engagement_ID))}>
                                <Text style={{ color: "#03396c" }}>VIEW DETAILS</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.engagementBottomLine} />
                </View>
            )
        })
    }

    render() {
        return (
            <View style={{ flex: 1, height, }}>
                <ScrollView refreshControl={
                    <RefreshControl refreshing={this.state.refreshing} onRefresh={this.refreshScreen} />
                }
                    style={styles.mainContainer}>
                    <View >
                        <TouchableOpacity onPress={() => this.props.navigation.navigate("ManageEngagements")} style={styles.buttonContainer}>
                            <Text style={styles.buttonText}>Manage Engagements</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.bothButtonContainer}>
                        <View style={{ width: '50%', marginRight: 2 }}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate("ManageMentors")} style={styles.buttonContainer}>
                                <Text style={styles.buttonText}>Manage Mentors</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ width: '50%', marginLeft: 2 }}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate("ManageMentees")} style={styles.buttonContainer}>
                                <Text style={styles.buttonText}>Manage Mentees</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.midTextContainer}>
                        <Text style={styles.midText}>My Engagements</Text>
                    </View>

                    <View >
                        {this.state.loading ? (<View style={styles.loader}><Loader loading={this.state.loading} /></View>) : (<View />)}
                        {this.renderEngagements()}
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        height,
        width: '100%',
        backgroundColor: '#e5e5e5'
    },
    bothButtonContainer: {
        flexDirection: 'row',
        marginHorizontal: 2,
        width: '100%',
    },
    buttonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#307ecc',
        width: '100%',
        height: 35,
        margin: 2,
    },
    buttonText: {
        flex: 1,
        alignSelf: 'center',
        marginVertical: 5,
        color: '#fff',
        fontSize: 20,
    },
    midTextContainer: {
        height: 35,
        backgroundColor: '#f2f2f2',
        marginHorizontal: 2,
        alignContent: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    midText: {
        fontSize: 20,
        fontWeight: '600',
        alignSelf: 'center',
        color: '#000',
    },
    loader: {
        alignContent: 'center',
        alignSelf: 'center',
    },

    mapContainerMentor: {
        flex: 1,
        alignSelf: 'flex-start',
        height: 'auto',
        width: '98%',
        backgroundColor: '#f2f2f2',
        margin: 2,
    },
    engagementBottomLine: {
        height: 2,
        backgroundColor: '#e2e2e2',
    },
})