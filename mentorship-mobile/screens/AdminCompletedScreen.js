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

export default class AdminCompletedScreen extends Component {

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
                    <View key={val.engagement_ID}>
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
                    </View>
                )
            }

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
    reasonForEngagement: {
        marginLeft: 8,
        fontSize: 15,
        fontFamily: 'sans-serif',
        width: '70%',
    },
    proposed: {
        fontSize: 10,
        fontStyle: 'italic',
    },
    engagementBottomLine: {
        height: 2,
        backgroundColor: '#e2e2e2',
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