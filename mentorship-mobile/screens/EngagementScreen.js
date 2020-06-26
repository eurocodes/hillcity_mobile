import React, { Component } from 'react';
import { Alert, AsyncStorage, Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Constants from 'expo-constants'

import { setEngID } from '../Backend/Storage';
import { fetchEngagementsMentor, fetchEngagementsMentee } from '../Backend/API';
import Loader from '../components/Loader';

export default class EngagementScreen extends Component {

    state = {
        engagements: [],
        role: "",
        loading: false,
    }

    async componentDidMount() {
        const role = await this.getUserRole()
        console.log("My Role:", role);

        if (role === "mentor") {
            this.getMentorEngagements()
            return
        } else if (role === "adminmember") {
            this.getMentorEngagements()
            return
        }
        this.getMenteeEngagements()
        return
    }

    // Get user Role
    // getRole = async () => getUserRole("role");
    getUserRole = async () => AsyncStorage.getItem("role");

    getMentorEngagements = async () => {
        this.setState({ loading: true })
        try {
            const results = await fetchEngagementsMentor()
            console.log("Mentor Result:", results)
            if (results[0]) {
                this.setState({ engagements: results, role: "mentor" })
                this.setState({ loading: false })
                console.log("STATE:", this.state)
                return
            } else {
                this.setState({ engagements: "You don't have any engagements", role: "mentor" })
                this.setState({ loading: false })
                console.log("STATE:", this.state)
            }
        } catch (err) {
            this.setState({ loading: false })
            console.log(err)
            return
        }
    }

    getMenteeEngagements = async () => {
        this.setState({ loading: true })
        try {
            const results = await fetchEngagementsMentee()
            console.log("Mentor Result:", results)
            if (results[0]) {
                this.setState({ engagements: results, role: "mentee" })
                this.setState({ loading: false })
                console.log("STATE:", this.state)
                return
            } else {
                this.setState({ engagements: "You don't have any engagements", role: "mentee" })
                this.setState({ loading: false })
                console.log("STATE:", this.state)
            }

        } catch (err) {
            this.setState({ loading: false })
            console.log(err)
        }
    }

    renderMentorEngagements() {
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
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ height: '30%', width: '12%', backgroundColor: '#4d5870', borderRadius: 30, marginLeft: 5, alignSelf: 'center', }}>
                            <Text style={{ height: 40, width: 75 }}>{val.photo}</Text>
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

    renderMenteeEngagements() {
        if (this.state.engagements === "You don't have any engagements") {
            return (
                <View style={styles.mapContainerMentor}>
                    <Text>{this.state.engagements}</Text>
                </View>
            )
        }
        return this.state.engagements.map((val, index) => {
            return (
                <View style={styles.mapContainerMentee} key={val.engagement_ID}>
                    <View style={{ margin: 5 }}>
                        <Text>{val.engagement_type}</Text>
                        <Text>{val.reason_for_engagement}</Text>
                        <Text>{val.status}</Text>
                        <Text>{val.proposed_date}</Text>
                    </View>
                    <TouchableOpacity style={{ margin: 5, width: '25%', }} onPress={() => this.props.navigation.navigate("SingleEngagement", setEngID(val.engagement_ID))}>
                        <Text style={{ color: "#03396c" }}>VIEW DETAILS</Text>
                    </TouchableOpacity>
                    <View style={styles.engagementBottomLine} />
                </View>
            )
        })

    }

    render() {

        return (
            <ScrollView style={styles.mainContainer}>
                {this.state.role === "mentor" ? (<View>{this.renderMentorEngagements()}</View>) :
                    (
                        <View>
                            <TouchableOpacity
                                style={{
                                    alignSelf: 'flex-end',
                                    marginHorizontal: 30,
                                    marginVertical: 10,
                                    borderRadius: 10,
                                    backgroundColor: '#011f4b'
                                }}
                                onPress={() => this.props.navigation.navigate("NewEngagement")}>
                                <Text style={{ fontSize: 15, padding: 5, color: "#e9eaec" }}>Start New Engagement</Text>
                            </TouchableOpacity>
                            {this.state.loading ? (<View style={styles.loader}><Loader loading={this.state.loading} /></View>) : (<View />)}
                            <View>{this.renderMenteeEngagements()}</View>
                        </View>
                    )}
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        paddingTop: Constants.statusBarHeight,
        alignContent: 'center',
        backgroundColor: '#eee',
    },
    mapContainerMentee: {
        flex: 1,
        alignSelf: 'center',
        height: 'auto',
        width: '98%',
        backgroundColor: '#f2f2f2',
        margin: 2,
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
    loader: {
        alignContent: 'center',
        alignSelf: 'center',
    },
})