import React, { Component } from 'react';
import { AsyncStorage, Button, Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Constants from 'expo-constants';
import * as DocumentPicker from 'expo-document-picker';
import { TextInput } from 'react-native-gesture-handler';

import { fetchAcceptEngagement, fetchRejectEngagement, fectchUploadReport } from '../Backend/API';
import Loader from '../components/Loader';

const baseUrl = "https://hillcityapp.herokuapp.com";

const { width, height } = Dimensions.get('window');
const getToken = async () => AsyncStorage.getItem("token");
const getUserRole = async () => AsyncStorage.getItem("role");
const getEngID = async () => AsyncStorage.getItem("id");

export default class SingleEngagement extends Component {

    state = {
        engagement: [],
        comment: '',
        role: '',
        file: null,
        loading: false,
    }

    async componentDidMount() {
        // const { navigation } = this.props;
        // const id = navigation.getParam('id')
        // console.log("This id:", id)
        return this.fetchSingleEngagement()
    }

    fetchSingleEngagement = async () => {
        this.setState({ loading: true })
        const token = await getToken()
        const role = await getUserRole()
        const id = await getEngID()
        console.log("IDD:", id)
        try {
            const response = await fetch(`${baseUrl}/api/v1/get/engagements/${id}`, {
                method: "GET",
                headers: {
                    "content-type": "application/json",
                    "Authorization": token
                }
            })
            const { data } = await response.json()
            console.log(data)
            this.setState({ engagement: data, role, loading: false })
            console.log("Single Engagement State:", this.state)
            return data
        } catch (err) {
            this.setState({ loading: false })
            throw new Error(err);
        }
    }

    acceptEngagement = async () => {
        this.setState({ loading: true })
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
            this.setState({ loading: false })
        }
    }

    rejectEngagement = async () => {
        this.setState({ loading: true })
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

    uploadReport = async () => {
        this.setState({ loading: true })
        const id = await getEngID()
        console.log("Confirm ID:", id)
        if (this.state.file === null) {
            alert("Please select file first")
            return
        }
        try {
            const response = await fectchUploadReport(id, this.state.file)
            console.log("Upload response:", response)
            this.fetchSingleEngagement(id)
        } catch (err) {
            this.setState({ loading: false })
            console.log(err)
        }

    }

    selectFile = async () => {
        this.setState({ loading: true })
        try {
            const response = await DocumentPicker.getDocumentAsync({
                type: "*/*",
                copyToCacheDirectory: false,
                multiple: false,
            });
            // consolog what was found
            console.log("Response:", response);
            if (!response.cancelled) {
                this.setState({ file: response, loading: false })
                return
            }
        } catch (error) {
            console.log("Error", error);
            this.setState({ file: null, loading: false })

        }
    };

    renderFileUploadView = () => {
        return (
            <View style={styles.uploadReport}>
                <View style={styles.reportButton}>
                    <View style={{ margin: 2 }}>
                        <Button title="Attach file" onPress={this.selectFile} />
                    </View>
                    <View style={{ margin: 2 }}>
                        <Button title="Upload" onPress={this.uploadReport} />
                    </View>
                </View>
                <View>
                    {this.state.file !== null ? (
                        <View style={styles.fileText}>
                            <Text style={{ marginVertical: 4 }}>
                                Name: {this.state.file.name ? this.state.file.name : ""}
                            </Text>
                            <Text style={{ marginVertical: 4 }}>
                                Size: {this.state.file.size ? `${Math.floor(this.state.file.size / 1024)}kb` : ""}
                            </Text>
                        </View>
                    ) : null}
                </View>
            </View>
        )
    }

    render() {

        return this.state.engagement.map((val, index) => {
            return (
                <ScrollView key={index}>
                    <ScrollView style={styles.mainContainer}>
                        {this.state.loading ? (<View style={styles.loader}><Loader loading={this.state.loading} /></View>) : (<View />)}
                        <View style={{ flex: 1, height, paddingTop: 2 }}>
                            <View style={{ margin: 2 }}>
                                <View style={{ alignContent: 'center', justifyContent: 'center', marginVertical: 2, height: '7%', backgroundColor: '#307ecc', }}>
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
                                        <Text style={{ margin: 10, }}>Engagement Reported </Text>
                                    </View>
                                    <View style={styles.mapDetails}>
                                        <Text style={{ margin: 10 }}>{val.is_report_up} {val.report_date_submitted}</Text>
                                    </View>
                                </View>

                                <View style={styles.engDetailsContainer}>
                                    <View style={styles.mapNameDetails}>
                                        <Text style={{ margin: 10, }}>Engagement Report </Text>
                                    </View>
                                    <View style={styles.mapDetails}>
                                        <Text style={{ margin: 10 }}>{val.report_uploaded}</Text>
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

                            {this.state.role !== "mentee" ? (
                                <View style={{ marginVertical: 4, }}>
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
                                    <View style={{ flexDirection: 'row', backgroundColor: '#f2f2f2', }}>
                                        <TouchableOpacity onPress={this.acceptEngagement}
                                            style={{ margin: 5, backgroundColor: '#307ecc', width: '20%' }} >
                                            <Text style={{ fontSize: 15, color: "#fff", margin: 2, alignSelf: 'center' }}>Accept</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={this.rejectEngagement}
                                            style={{ margin: 5, backgroundColor: 'red', width: '20%', }} >
                                            <Text style={{ fontSize: 15, color: "#fff", margin: 2, alignSelf: 'center' }}>Reject</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>) : (<View>
                                    {val.status === "Accepted" ? (
                                        <View style={{ marginTop: 2 }}>
                                            {this.renderFileUploadView()}
                                        </View>
                                    ) : (<View />)}
                                </View>)}
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
        paddingTop: 0.4,
        alignContent: 'center',
        backgroundColor: '#e5e5e5',
        height: '100%',
    },
    engDetailsContainer: {
        margin: 2,
        flexDirection: 'row',
        backgroundColor: '#f2f2f2',
        height: 'auto',
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
        backgroundColor: '#f2f2f2',
    },
    textArea: {
        height: 75,
        width: '60%',
        justifyContent: 'flex-start',
    },
    uploadReport: {
        flexDirection: 'row',
        backgroundColor: '#f2f2f2',
        margin: 2,
        marginTop: 5
    },
    reportButton: {
        margin: 2,
        width: '50%',
    },
    fileText: {
        borderColor: '#666',
        backgroundColor: '#f2f2f2',
        width: '120%',
        height: '100%',
        margin: 4,
    },
    loader: {
        alignContent: 'center',
        alignSelf: 'center',
    },
})