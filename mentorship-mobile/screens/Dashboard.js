import React, { Component } from 'react';
import { Alert, AsyncStorage, Dimensions, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Constants from 'expo-constants'
import Entypo from '@expo/vector-icons/Entypo';
// import Entypo from 'react-native-vector-icons/Entypo';

import { setEngID } from '../Backend/Storage';
import { fetchEngagementsMentor, fetchEngagementsMentee } from '../Backend/API';
import Loader from '../components/Loader';

export default class EngagementsScreen extends Component {

    state = {
        engagements: [],
        role: "",
        loading: false,
        refreshing: true,
    }

    async componentDidMount() {
        const role = await this.getUserRole()
        console.log("My Role:", role);

        if (role === "mentor") {
            this.getMentorEngagements()
            this.setState({ refreshing: false })
            return
        } else if (role === "mentee") {
            this.getMenteeEngagements()
            this.setState({ refreshing: false })
            return
        } else if (role === "adminmember") {
            this.getMentorEngagements()
            this.setState({ refreshing: false })
            return
        }
    }

    refreshScreen = async () => {
        const role = await this.getUserRole()
        console.log("My Role:", role);

        if (role === "mentor") {
            this.getMentorEngagements()
            this.setState({ refreshing: false })
            return
        } else if (role === "mentee") {
            this.getMenteeEngagements()
            this.setState({ refreshing: false })
            return
        } else if (role === "adminmember") {
            this.getMentorEngagements()
            this.setState({ refreshing: false })
            return
        }
    }

    // Get user Role
    // getRole = async () => getUserRole("role");
    getUserRole = async () => AsyncStorage.getItem("role");

    getMentorEngagements = async () => {
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

    getMenteeEngagements = async () => {
        this.setState({ loading: true })
        try {
            const results = await fetchEngagementsMentee()
            if (results[0]) {
                this.setState({ engagements: results, role: "mentee" })
                this.setState({ loading: false })
                return
            } else {
                this.setState({ engagements: "You don't have any engagements", role: "mentee" })
                this.setState({ loading: false })
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
                    <View style={{ flexDirection: 'row', backgroundColor: '#aaa' }}>
                        <View style={{ height: '30%', width: '12%', marginLeft: 5, alignSelf: 'center', }}>
                            {/* <Text style={{ height: 40, width: 75 }}>{val.photo}</Text> */}
                            <Entypo name='user' size={40} />
                        </View>
                        <View style={styles.mapContainerMentor}>
                            <View style={{ alignSelf: 'flex-start', marginLeft: 8, marginVertical: 5, borderRadius: 5, }}>
                                <Text style={{ fontWeight: 'bold', color: '#307ecc' }}>{`${val.First_Name.toUpperCase()} ${val.Last_Name.toUpperCase()}`}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginVertical: 5, width: '100%', }}>
                                <View>
                                    <View style={{ marginLeft: 8, borderRadius: 5, paddingHorizontal: 4, backgroundColor: '#b3cde0', width: 'auto', }} >
                                        <Text style={{ color: '#005b96' }}>{val.engagement_type}</Text>
                                    </View>
                                </View>
                                <View style={{ flex: 1, alignItems: 'flex-end', paddingHorizontal: 4, marginRight: 4, }}>
                                    <Text>{val.proposed_date}</Text>
                                    <Text> at {val.proposed_time}</Text>
                                </View>
                            </View>
                            <Text style={styles.reasonForEngagement}>{`${val.reason_for_engagement.slice(0, 80)}...`}</Text>
                            <View style={{ flex: 1, flexDirection: 'row', width: 'auto', marginVertical: 5, }}>
                                <TouchableOpacity style={{ marginLeft: 8, width: 'auto', }} onPress={() => this.props.navigation.navigate("SingleEngagement", setEngID(val.engagement_ID))}>
                                    <Text style={{ color: "#03396c" }}>VIEW DETAILS</Text>
                                </TouchableOpacity>
                                <View style={{ width: '70%', }}>
                                    <Text style={{ paddingHorizontal: 4, borderRadius: 5, alignSelf: 'flex-end', textTransform: 'capitalize', marginRight: 4, }}>
                                        {val.status}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.engagementBottomLine} />
                </View>
            )
        })

    }

    renderMenteeEngagements() {

        return (
            <View>

                {this.state.engagements === "You don't have any engagements" ?
                    (
                        <View style={styles.mapContainerMentor}>
                            <Text>{this.state.engagements}</Text>
                        </View>
                    ) :
                    this.state.engagements.map((val, index) => {
                        return (
                            <View style={styles.mapContainerMentee} key={val.engagement_ID}>
                                <View style={{ flexDirection: 'row', marginVertical: 5, width: '100%', }}>
                                    <View>
                                        <View style={{ marginLeft: 8, borderRadius: 5, paddingHorizontal: 4, backgroundColor: '#b3cde0', width: 'auto', }} >
                                            <Text style={{ color: '#005b96' }}>{val.engagement_type}</Text>
                                        </View>
                                    </View>
                                    <View style={{ flex: 1, alignItems: 'flex-end', paddingHorizontal: 4, marginRight: 4, }}>
                                        <Text>{val.proposed_date}</Text>
                                        <Text> at {val.proposed_time}</Text>
                                    </View>
                                </View>
                                <Text style={styles.reasonForEngagement}>{`${val.reason_for_engagement.slice(0, 80)}...`}</Text>
                                <View style={{ flex: 1, flexDirection: 'row', width: 'auto', marginVertical: 5, }}>
                                    <TouchableOpacity style={{ marginLeft: 8, width: 'auto', }} onPress={() => this.props.navigation.navigate("SingleEngagement", setEngID(val.engagement_ID))}>
                                        <Text style={{ color: "#03396c" }}>VIEW DETAILS</Text>
                                    </TouchableOpacity>
                                    <View style={{ width: '70%', }}>
                                        <Text style={{ paddingHorizontal: 4, borderRadius: 5, alignSelf: 'flex-end', textTransform: 'capitalize', marginRight: 4, }}>
                                            {val.status}
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.engagementBottomLine} />
                            </View>
                        )
                    })
                }
            </View>
        )
    }

    render() {

        return (
            <ScrollView refreshControl={
                <RefreshControl refreshing={this.state.refreshing} onRefresh={this.refreshScreen} />
            }
                style={styles.mainContainer}>
                {this.state.loading ? (<View style={styles.loader}><Loader loading={this.state.loading} /></View>) : <View />}
                {this.state.role === "mentee" ? (
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
                            <View style={{ flexDirection: 'row', backgroundColor: '#011f4b', borderRadius: 5 }}>
                                <Text style={{ fontSize: 15, padding: 5, color: "#e9eaec" }}>Start New Engagement</Text>
                                <Entypo name='circle-with-plus' color="#e9eaec" size={30} />
                            </View>
                        </TouchableOpacity>
                        {this.renderMenteeEngagements()}
                    </View>
                ) :
                    (
                        <View>
                            <View>{this.renderMentorEngagements()}</View>
                        </View>
                    )}
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
        width: '98%',
        backgroundColor: '#f2f2f2',
        margin: 2,
        marginVertical: 5,
    },
    mapContainerMentor: {
        flex: 1,
        alignSelf: 'flex-start',
        height: 'auto',
        width: '98%',
        backgroundColor: '#f2f2f2',
        margin: 2,
    },
    reasonForEngagement: {
        marginLeft: 8,
        fontSize: 15,
        fontFamily: 'sans-serif',
    },
    engagementBottomLine: {
        height: 4,
        backgroundColor: '#e2e2e2',
    },
    loader: {
        alignContent: 'center',
        alignSelf: 'center',
    },
})