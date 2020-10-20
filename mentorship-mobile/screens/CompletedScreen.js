import React, { Component } from 'react';
import { Alert, AsyncStorage, Dimensions, RefreshControl, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Constants from 'expo-constants'
import Entypo from '@expo/vector-icons/Entypo';
import * as Animatable from 'react-native-animatable';
// import Entypo from 'react-native-vector-icons/Entypo';

import { setEngID } from '../Backend/Storage';
import { fetchEngagementsMentor, fetchEngagementsMentee } from '../Backend/API';
import Loader from '../components/Loader';

const { height, width } = Dimensions.get('window');

export default class CompletedScreen extends Component {

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
            let color;
            let backgroundColor;
            if (val.engagement_type == 'LIFE GOALS & VISION') {
                color = styles.light_green;
                backgroundColor = styles.light_green_background;
            } else if (val.engagement_type == 'ACADEMIC COUNSELLING') {
                color = styles.corn_flower_blue;
                backgroundColor = styles.corn_flower_blue_background;
            } else if (val.engagement_type == 'PRINCIPLES & VALUES') {
                color = styles.deep_pink;
                backgroundColor = styles.deep_pink_background
            } else if (val.engagement_type == 'GENERAL WELL BEING') {
                color = styles.choco;
                backgroundColor = styles.choco_background
            }

            if (val.status == 'Completed' || val.status == 'Task Assigned') {

                let statusColor;
                if (val.status == 'Completed') {
                    statusColor = styles.completed;
                } else {
                    statusColor = styles.task_assigned;
                }
                return (
                    <Animatable.View
                        animation="fadeInUpBig" duration={2000} key={val.engagement_ID}>
                        <View style={{ flexDirection: 'row', backgroundColor: '#aaa' }}>
                            <View style={{ height: '30%', width: '12%', marginLeft: 5, alignSelf: 'center', }}>
                                {/* <Text style={{ height: 40, width: 75 }}>{val.photo}</Text> */}
                                <Entypo name='user' size={40} />
                            </View>
                            <View style={styles.mapContainerMentor}>
                                <View style={{ alignSelf: 'flex-start', marginLeft: 8, marginVertical: 5, borderRadius: 5, }}>
                                    <Text style={{ fontWeight: 'bold', color: '#307ecc', fontSize: 15 }}>{`${val.First_Name.toUpperCase()} ${val.Last_Name.toUpperCase()}`}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', marginVertical: 5, width: '100%', }}>
                                    <View>
                                        <View style={backgroundColor} >
                                            <Text style={{ fontSize: 18 }, [color]}>{val.engagement_type}</Text>
                                        </View>
                                    </View>
                                    <View style={{ flex: 1, alignItems: 'flex-end', paddingHorizontal: 4, marginRight: 4, }}>
                                        <Text style={styles.proposed}>{val.proposed_date}</Text>
                                        <Text style={styles.proposed}> at {val.proposed_time}</Text>
                                    </View>
                                </View>
                                <Text style={styles.reasonForEngagement}>{`${val.reason_for_engagement.slice(0, 80)}...`}</Text>
                                <View style={{ flex: 1, flexDirection: 'row', width, marginVertical: 5, }}>
                                    <TouchableOpacity style={{ marginLeft: 8, width: 'auto', }} onPress={() => this.props.navigation.navigate("SingleEngagement", setEngID(val.engagement_ID))}>
                                        <Text style={{ color: "#03396c" }}>VIEW DETAILS</Text>
                                    </TouchableOpacity>
                                    <View style={{ width: '62%', }}>
                                        <Text style={statusColor}>
                                            {val.status}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={styles.engagementBottomLine} />
                    </Animatable.View>
                )
            }

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
                        let color;
                        let backgroundColor;
                        if (val.engagement_type == 'LIFE GOALS & VISION' || val.engagement_type == 'LIFE GOAL AND VISION') {
                            color = styles.light_green;
                            backgroundColor = styles.light_green_background;
                        } else if (val.engagement_type == 'ACADEMIC COUNSELLING') {
                            color = styles.corn_flower_blue;
                            backgroundColor = styles.corn_flower_blue_background;
                        } else if (val.engagement_type == 'PRINCIPLES & VALUES') {
                            color = styles.deep_pink;
                            backgroundColor = styles.deep_pink_background
                        } else if (val.engagement_type == 'GENERAL WELL BEING') {
                            color = styles.choco;
                            backgroundColor = styles.choco_background
                        }

                        if (val.status == 'Completed' || val.status == 'Task Assigned') {

                            let statusColor;
                            if (val.status == 'Completed') {
                                statusColor = styles.completed;
                            } else {
                                statusColor = styles.task_assigned;
                            }
                            return (
                                <Animatable.View
                                    animation='fadeInUpBig' duration={2000} style={styles.mapContainerMentee} key={val.engagement_ID}>
                                    <View style={{ flexDirection: 'row', marginVertical: 5, width: '100%', }}>
                                        <View>
                                            <View style={{ marginLeft: 8, borderRadius: 5, paddingHorizontal: 4, width: 'auto', }, [backgroundColor]} >
                                                <Text style={{ fontSize: 18 }, [color]}>{val.engagement_type}</Text>
                                            </View>
                                        </View>
                                        <View style={{ flex: 1, alignItems: 'flex-end', paddingHorizontal: 4, marginRight: 4, }}>
                                            <Text style={styles.proposed}>{val.proposed_date}</Text>
                                            <Text style={styles.proposed}> at {val.proposed_time}</Text>
                                        </View>
                                    </View>
                                    <Text style={styles.reasonForEngagement}>{`${val.reason_for_engagement.slice(0, 80)}...`}</Text>
                                    <View style={{ flex: 1, flexDirection: 'row', width, marginVertical: 5, }}>
                                        <TouchableOpacity style={{ marginLeft: 8, width: 'auto', }} onPress={() => this.props.navigation.navigate("SingleEngagement", setEngID(val.engagement_ID))}>
                                            <Text style={{ color: "#03396c" }}>VIEW DETAILS</Text>
                                        </TouchableOpacity>
                                        <View style={{ width: '75%', }}>
                                            <Text style={{ paddingHorizontal: 2, alignSelf: 'flex-end', textTransform: 'capitalize', marginRight: 2, }}>
                                                {val.status}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={styles.engagementBottomLine} />
                                </Animatable.View>
                            )
                        }

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
                <StatusBar backgroundColor='#252757' barStyle='light-content' />
                {this.state.loading ? (<View style={styles.loader}><Loader loading={this.state.loading} /></View>) : <View />}
                {this.state.role === "mentee" ? (
                    <View>
                        <TouchableOpacity
                            style={{
                                alignItems: 'center',
                                marginHorizontal: 30,
                                marginVertical: 10,
                                borderRadius: 10,
                            }}
                            onPress={() => this.props.navigation.navigate("NewEngagement")}>
                            <View style={{ flexDirection: 'row', width: "100%", justifyContent: 'space-between', marginHorizontal: 2, backgroundColor: '#3a3c67', borderRadius: 5, }}>
                                <Text style={{ fontSize: 20, padding: 15, color: "#fff" }}>Start New Engagement</Text>
                                <Entypo name='circle-with-plus' color="#e9eaec" size={40}
                                    style={{ alignSelf: 'center', }} />
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
        backgroundColor: '#515265',
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
        width: '65%',
    },
    proposed: {
        fontSize: 10,
        fontStyle: 'italic',
    },
    engagementBottomLine: {
        height: 4,
        backgroundColor: '#e2e2e2',
    },
    loader: {
        alignContent: 'center',
        alignSelf: 'center',
    },

    sky_blue: {
        color: '#005b96',
    },
    sky_blue_background: {
        backgroundColor: '#e0e9fb',
        marginLeft: 8,
        borderRadius: 5,
        paddingHorizontal: 4,
        width: 'auto',
    },
    corn_flower_blue: {
        color: '#6494ed',
    },
    corn_flower_blue_background: {
        backgroundColor: '#b3cde0',
        marginLeft: 8,
        borderRadius: 5,
        paddingHorizontal: 4,
        width: 'auto',
    },
    deep_pink: {
        color: '#6c23fd',
    },
    deep_pink_background: {
        backgroundColor: '#e1d3fe',
        marginLeft: 8,
        borderRadius: 5,
        paddingHorizontal: 4,
        width: 'auto',
    },
    light_green: {
        color: '#228b22',
    },
    light_green_background: {
        backgroundColor: '#d2e7d2',
        marginLeft: 8,
        borderRadius: 5,
        paddingHorizontal: 4,
        width: 'auto',
    },
    choco: {
        color: '#ff7e24',
    },
    choco_background: {
        backgroundColor: '#ffe5d3',
        marginLeft: 8,
        borderRadius: 5,
        paddingHorizontal: 4,
        width: 'auto',
    },
    fire_red: {
        color: '#ff3030',
    },
    fire_red_background: {
        backgroundColor: '#ff5d5d',
        marginLeft: 8,
        borderRadius: 5,
        paddingHorizontal: 4,
        width: 'auto',
    },

    completed: {
        color: '#698b22',
        paddingHorizontal: 2,
        alignSelf: 'flex-end',
        textTransform: 'capitalize',
        marginRight: 2,
    },
    task_assigned: {
        color: '#ffa500',
        paddingHorizontal: 2,
        alignSelf: 'flex-end',
        textTransform: 'capitalize',
        marginRight: 2,
    }
})