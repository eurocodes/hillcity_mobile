import React, { Component } from 'react';
import { AsyncStorage, Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Constants from 'expo-constants';

import { fetchAcceptEngagement, fetchRejectEngagement } from '../Backend/API';
import { TextInput } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');
const getToken = async () => AsyncStorage.getItem("token");
const getUserRole = async () => AsyncStorage.getItem("role");
const getEngID = async () => AsyncStorage.getItem("id");

export default class SingleEngagement extends Component {

    state = {
        engagement: [],
        comment: '',
        role: '',
    }

    async componentDidMount() {
        // const { navigation } = this.props;
        // const id = navigation.getParam('id')
        // console.log("This id:", id)
        return this.fetchSingleEngagement()
    }

    fetchSingleEngagement = async () => {
        const token = await getToken()
        const role = await getUserRole()
        const id = await getEngID()
        console.log("IDD:", id)
        try {
            const response = await fetch(`http://localhost:3400/api/v1/get/engagements/${id}`, {
                method: "GET",
                headers: {
                    "content-type": "application/json",
                    "Authorization": token
                }
            })
            const { data } = await response.json()
            console.log(data)
            this.setState({ engagement: data, role })
            console.log("Single Engagement State:", this.state)
            return data
        } catch (err) {
            throw new Error(err);
        }
    }

    acceptEngagement = async () => {
        // const { navigation } = this.props;
        // const id = navigation.getParam('id')
        const id = await getEngID()
        console.log("Confirm ID:", id)
        try {
            const response = await fetchAcceptEngagement(id, this.state.comment)
            console.log("Accept response:", response)
            this.fetchSingleEngagement(id)
        } catch (err) {
            console.log(err)
        }
    }

    rejectEngagement = async () => {
        // const { navigation } = this.props;
        // const id = navigation.getParam('id')
        const id = await getEngID()
        console.log("Confirm ID:", id)
        try {
            const response = await fetchRejectEngagement(id, this.state.comment)
            console.log("Accept response:", response)
            this.fetchSingleEngagement(id)
        } catch (err) {
            console.log(err)
        }
    }

    handleInputText = comment => {
        this.setState({ comment })
        console.log("Comment:", this.state.comment)
    }


    render() {

        return this.state.engagement.map((val, index) => {
            return (
                <ScrollView key={index}>
                    <ScrollView style={styles.mainContainer}>
                        <View style={{ flex: 1, height: '100%' }}>
                            <View>
                                <View style={{ alignContent: 'center', justifyContent: 'center', marginVertical: 2, height: '7%', backgroundColor: '#307ecc' }}>
                                    <Text style={{ alignSelf: 'center', color: '#fff', fontSize: 20, fontFamily: 'sans-serif' }}>{val.engagement_type.toUpperCase()}</Text>
                                </View>

                                <View style={styles.engDetailsContainer}>
                                    <View style={styles.mapNameDetails}>
                                        <Text style={{ margin: 10, }}>Reason for Engagement </Text>
                                    </View>
                                    <View style={styles.mapDetails}>
                                        <Text style={{ margin: 10 }}>{val.reason_for_engagement}</Text>
                                    </View>
                                </View>

                                <View style={styles.engDetailsContainer}>
                                    <View style={styles.mapNameDetails}>
                                        <Text style={{ margin: 10, }}>Mode of Engagement </Text>
                                    </View>
                                    <View style={styles.mapDetails}>
                                        <Text style={{ margin: 10 }}>{val.mode_of_engagement}</Text>
                                    </View>
                                </View>

                                <View style={styles.engDetailsContainer}>
                                    <View style={styles.mapNameDetails}>
                                        <Text style={{ margin: 10, }}>Status </Text>
                                    </View>
                                    <View style={styles.mapDetails}>
                                        <Text style={{ margin: 10 }}>{val.status}</Text>
                                    </View>
                                </View>

                                <View style={styles.engDetailsContainer}>
                                    <View style={styles.mapNameDetails}>
                                        <Text style={{ margin: 10, }}>Comment </Text>
                                    </View>
                                    <View style={styles.mapDetails}>
                                        <Text style={{ margin: 10 }}>{val.mentor_reject_comment}</Text>
                                    </View>
                                </View>

                                <View style={styles.engDetailsContainer}>
                                    <View style={styles.mapNameDetails}>
                                        <Text style={{ margin: 10, }}>Proposed date </Text>
                                    </View>
                                    <View style={styles.mapDetails}>
                                        <Text style={{ margin: 10 }}> {val.proposed_date}</Text>
                                    </View>
                                </View>

                                <View style={styles.engDetailsContainer}>
                                    <View style={styles.mapNameDetails}>
                                        <Text style={{ margin: 10, }}>Proposed time </Text>
                                    </View>
                                    <View style={styles.mapDetails}>
                                        <Text style={{ margin: 10 }}> {val.proposed_time}</Text>
                                    </View>
                                </View>

                                <View style={styles.engDetailsContainer}>
                                    <View style={styles.mapNameDetails}>
                                        <Text style={{ margin: 10, }}>Task </Text>
                                    </View>
                                    <View style={styles.mapDetails}>
                                        <Text style={{ margin: 10 }}>{val.engagement_task}</Text>
                                    </View>
                                </View>

                                <View style={styles.engDetailsContainer}>
                                    <View style={styles.mapNameDetails}>
                                        <Text style={{ margin: 10, }}>Type </Text>
                                    </View>
                                    <View style={styles.mapDetails}>
                                        <Text style={{ margin: 10 }}>{val.task_type}</Text>
                                    </View>
                                </View>

                                <View style={styles.engDetailsContainer}>
                                    <View style={styles.mapNameDetails}>
                                        <Text style={{ margin: 10, }}>Closure comment </Text>
                                    </View>
                                    <View style={styles.mapDetails}>
                                        <Text style={{ margin: 10 }}>{val.Mentor_Closure_Comment}</Text>
                                    </View>
                                </View>
                            </View>

                            {this.state.role === "mentor" ? (
                                <View>
                                    <View style={styles.textAreaContainer}>
                                        <TextInput
                                            style={styles.textArea}
                                            value={this.state.comment}
                                            onChangeText={this.handleInputText}
                                            placeholder='Please write comment'
                                            placeholderTextColor='gray'
                                            multiline={true}
                                        />
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <TouchableOpacity onPress={this.acceptEngagement}
                                            style={{ margin: 5, backgroundColor: 'green', borderRadius: 10 }} >
                                            <Text style={{ fontSize: 15, color: "#fff", margin: 2, }}>Accept</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={this.rejectEngagement}
                                            style={{ margin: 5, backgroundColor: 'red', borderRadius: 10 }} >
                                            <Text style={{ fontSize: 15, color: "#fff", margin: 2, }}>Reject</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>) : (<View />)}

                            {this.state.role === "adminmember" ? (
                                <View>
                                    <View style={styles.textAreaContainer}>
                                        <TextInput
                                            style={styles.textArea}
                                            value={this.state.comment}
                                            onChangeText={this.handleInputText}
                                            placeholder='Please write comment'
                                            placeholderTextColor='gray'
                                            multiline={true}
                                        />
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <TouchableOpacity onPress={this.acceptEngagement}
                                            style={{ margin: 5, backgroundColor: 'green', borderRadius: 10 }} >
                                            <Text style={{ fontSize: 15, color: "#fff", margin: 2, }}>Accept</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={this.rejectEngagement}
                                            style={{ margin: 5, backgroundColor: 'red', borderRadius: 10 }} >
                                            <Text style={{ fontSize: 15, color: "#fff", margin: 2, }}>Reject</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>) : (<View />)}
                        </View>
                    </ScrollView>
                </ScrollView>
            )
        })
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        paddingTop: Constants.statusBarHeight,
        flex: 1,
        alignContent: 'center',
        backgroundColor: '#e5e5e5',
        height: '100%',
    },
    engDetailsContainer: {
        margin: 2,
        flexDirection: 'row',
        backgroundColor: '#f2f2f2',
        minHeight: height * 0.1,
    },
    mapNameDetails: {
        margin: 2,
        width: '30%',
    },
    mapDetails: {
        margin: 2,
        width: '70%',
    },
    textAreaContainer: {
        borderColor: 'gray',
        borderWidth: 1,
        paddingRight: 5,
        margin: 5,
        borderRadius: 5,
    },
    textArea: {
        height: 75,
        justifyContent: 'flex-start',
    }
})