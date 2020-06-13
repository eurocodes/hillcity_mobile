import React, { Component } from 'react';
import { Alert, AsyncStorage, Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, ColorPropType } from 'react-native';

import { fetchAcceptEngagement, fetchRejectEngagement } from '../Backend/API';
import { TextInput } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');
const getToken = async () => AsyncStorage.getItem("token");
const getUserRole = async () => AsyncStorage.getItem("role");

export default class SingleEngagement extends Component {

    state = {
        engagement: [],
        comment: '',
        role: '',
    }

    componentDidMount() {
        const { navigation } = this.props;
        const id = navigation.getParam('id')
        console.log("This id:", id)
        this.fetchSingleEngagement(id)
    }

    fetchSingleEngagement = async id => {
        const token = await getToken()
        const role = await getUserRole()
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
            return data
        } catch (err) {
            throw new Error(err);
        }
    }

    acceptEngagement = async () => {
        const { navigation } = this.props;
        const id = navigation.getParam('id')
        console.log("Confirm ID:", id)
        try {
            const response = await fetchAcceptEngagement(id)
            console.log("Accept response:", response)
            this.fetchSingleEngagement(id)
        } catch (err) {
            console.log(err)
        }
    }

    rejectEngagement = async () => {
        const { navigation } = this.props;
        const id = navigation.getParam('id')
        console.log("Confirm ID:", id)
        try {
            const response = await fetchRejectEngagement(id)
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
                <View key={index}>
                    <View style={{ height: 60, backgroundColor: '#307ecc', width: '100%' }}>
                        <TouchableOpacity style={{ marginTop: 5, marginBottom: 5, }} onPress={() => this.props.navigation.navigate("Engagements")}>
                            <Text style={{ fontSize: 20, color: "#fff", marginVertical: 12, marginLeft: 10, }}>{"<"} Back</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.mainContainer}>
                        <View style={{ flex: 1, height: '100%' }}>
                            <View>
                                <View style={{ alignContent: 'center', minHeight: height * 0.1, backgroundColor: '#6497b1' }}>
                                    <Text style={{ alignSelf: 'center', margin: 10 }}>{val.engagement_type.toUpperCase()}</Text>
                                </View>

                                <View style={styles.engDetailsContainer}>
                                    <View style={{ margin: 2, width: '45%', }}>
                                        <Text style={{ margin: 10, }}>Reason for Engagement </Text>
                                    </View>
                                    <View style={{ margin: 2, width: '45%', }}>
                                        <Text style={{ margin: 10 }}>{val.reason_for_engagement}</Text>
                                    </View>
                                </View>

                                <View style={styles.engDetailsContainer}>
                                    <View style={{ margin: 2, width: '45%', }}>
                                        <Text style={{ margin: 10, }}>Mode of Engagement </Text>
                                    </View>
                                    <View style={{ margin: 2, width: '45%', }}>
                                        <Text style={{ margin: 10 }}>{val.mode_of_engagement}</Text>
                                    </View>
                                </View>

                                <View style={styles.engDetailsContainer}>
                                    <View style={{ margin: 2, width: '45%', }}>
                                        <Text style={{ margin: 10, }}>Status </Text>
                                    </View>
                                    <View style={{ margin: 2, width: '45%', }}>
                                        <Text style={{ margin: 10 }}>{val.status}</Text>
                                    </View>
                                </View>

                                <View style={styles.engDetailsContainer}>
                                    <View style={{ margin: 2, width: '45%', }}>
                                        <Text style={{ margin: 10, }}>Comment </Text>
                                    </View>
                                    <View style={{ margin: 2, width: '45%', }}>
                                        <Text style={{ margin: 10 }}>{val.mentor_reject_comment}</Text>
                                    </View>
                                </View>

                                <View style={styles.engDetailsContainer}>
                                    <View style={{ margin: 2, width: '45%', }}>
                                        <Text style={{ margin: 10, }}>Proposed date </Text>
                                    </View>
                                    <View style={{ margin: 2, width: '45%', }}>
                                        <Text style={{ margin: 10 }}> {val.proposed_date}</Text>
                                    </View>
                                </View>

                                <View style={styles.engDetailsContainer}>
                                    <View style={{ margin: 2, width: '45%', }}>
                                        <Text style={{ margin: 10, }}>Proposed time </Text>
                                    </View>
                                    <View style={{ margin: 2, width: '45%', }}>
                                        <Text style={{ margin: 10 }}> {val.proposed_time}</Text>
                                    </View>
                                </View>

                                <View style={styles.engDetailsContainer}>
                                    <View style={{ margin: 2, width: '45%', }}>
                                        <Text style={{ margin: 10, }}>Task </Text>
                                    </View>
                                    <View style={{ margin: 2, width: '45%', }}>
                                        <Text style={{ margin: 10 }}>{val.engagement_task}</Text>
                                    </View>
                                </View>

                                <View style={styles.engDetailsContainer}>
                                    <View style={{ margin: 2, width: '45%', }}>
                                        <Text style={{ margin: 10, }}>Type </Text>
                                    </View>
                                    <View style={{ margin: 2, width: '45%', }}>
                                        <Text style={{ margin: 10 }}>{val.task_type}</Text>
                                    </View>
                                </View>

                                <View style={styles.engDetailsContainer}>
                                    <View style={{ margin: 2, width: '45%', }}>
                                        <Text style={{ margin: 10, }}>Closure comment </Text>
                                    </View>
                                    <View style={{ margin: 2, width: '45%', }}>
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
                        <TouchableOpacity style={{ margin: 5 }} onPress={() => this.props.navigation.navigate("Engagements")}>
                            <Text style={{ color: "#03396c" }}>Go back</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        })
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignContent: 'center',
        backgroundColor: '#eee',
        height: '100%',
    },
    engDetailsContainer: {
        margin: 2,
        flexDirection: 'row',
        backgroundColor: '#9bbcc3',
        minHeight: height * 0.1,
    },
    textAreaContainer: {
        borderColor: 'gray',
        borderWidth: 1,
        paddingRight: 5,
    },
    textArea: {
        height: 150,
        justifyContent: 'flex-start',
    }
})