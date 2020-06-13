import React, { Component } from 'react';
import { Alert, AsyncStorage, Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { fetchEngagementsMentor, fetchEngagementsMentee } from '../Backend/API';

export default class EngagementScreen extends Component {

    state = {
        engagements: [],
        role: "",
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
        try {
            const results = await fetchEngagementsMentor()
            console.log("Mentor Result:", results)
            this.setState({ engagements: results, role: "mentor" })
            console.log("STATE:", this.state)
            return
        } catch (err) {
            console.log(err)
            Alert.alert("Your session has expired")
            this.props.navigation.navigate('Signin');
            return
        }
    }

    getMenteeEngagements = async () => {
        try {
            const results = await fetchEngagementsMentee()
            console.log("Mentor Result:", results)
            this.setState({ engagements: results, role: "mentee" })
            console.log("STATE:", this.state)
            return
        } catch (err) {
            console.log(err)
            Alert.alert("Your session has expired")
            this.props.navigation.navigate('Signin');
            return
        }
    }

    renderMentorEngagements() {
        return this.state.engagements.map((val, index) => {
            return (
                <View key={val.engagement_ID}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ height: 70, width: 80, backgroundColor: '#6497b1', borderRadius: 30, margin: 10, alignSelf: 'center', }}>
                            <Text style={{ height: 40, width: 75 }}>{val.photo}</Text>
                        </View>
                        <View style={styles.mapContainerMentor}>
                            <Text style={{ marginLeft: 8 }}>{`${val.First_Name} ${val.Last_Name}`}</Text>
                            <Text style={{ marginLeft: 8 }}>Engagement Type: {val.engagement_type}</Text>
                            <Text style={{ marginLeft: 8 }}>Reason for Engagement: {`${val.reason_for_engagement.slice(0, 20)}...`}</Text>
                            <Text style={{ marginLeft: 8 }}>Status: {val.status}</Text>
                            <Text style={{ marginLeft: 8 }}>Proposed date & time: {`${val.proposed_date} at ${val.proposed_time}`}</Text>
                            <TouchableOpacity style={{ marginLeft: 8 }} onPress={() => this.props.navigation.navigate("Engagement", { id: val.engagement_ID })}>
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
        return this.state.engagements.map((val, index) => {
            return (
                <View style={styles.mapContainerMentee} key={val.engagement_ID}>
                    <View style={{ margin: 5 }}>
                        <Text>{val.engagement_type}</Text>
                        <Text>{val.reason_for_engagement}</Text>
                        <Text>{val.status}</Text>
                        <Text>{val.proposed_date}</Text>
                    </View>
                    <TouchableOpacity style={{ margin: 5 }} onPress={() => this.props.navigation.navigate("Engagement", { id: val.engagement_ID })}>
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
                    (<View>{this.renderMenteeEngagements()}</View>)}
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignContent: 'center',
        backgroundColor: '#eee',
    },
    mapContainerMentee: {
        flex: 1,
        alignSelf: 'center',
        height: 'auto',
        width: '90%',
        backgroundColor: '#d7dde7',
        borderRadius: 15,
        margin: 10,
    },
    mapContainerMentor: {
        flex: 1,
        alignSelf: 'flex-start',
        height: 'auto',
        width: '90%',
        backgroundColor: '#d7dde7',
        borderRadius: 15,
        margin: 10,
    },
    engagementBottomLine: {
        height: 2,
        backgroundColor: '#e2e2e2',
    },
})