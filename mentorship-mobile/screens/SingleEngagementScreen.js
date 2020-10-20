import React, { Component } from 'react';
import { AsyncStorage, Button, Dimensions, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Constants from 'expo-constants';
import * as DocumentPicker from 'expo-document-picker';
import { TextInput } from 'react-native-gesture-handler';

import { setEngID } from '../Backend/Storage';
import { fetchAcceptEngagement, fectchUploadReport } from '../Backend/API';
import Loader from '../components/Loader';

const baseUrl = "https://hillcityapp.herokuapp.com";
const localBaseUrl = "http://localhost:3400";

const { width, height } = Dimensions.get('window');
const getToken = async () => AsyncStorage.getItem("token");
const getUserRole = async () => AsyncStorage.getItem("role");
const getEngID = async () => AsyncStorage.getItem("id");

export default class SingleEngagement extends Component {

    state = {
        engagement: [],
        comment: '',
        role: '',
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
        try {
            const response = await fetch(`${baseUrl}/api/v1/get/engagements/${id}`, {
                method: "GET",
                headers: {
                    "content-type": "application/json",
                    "Authorization": token
                }
            })
            const { data } = await response.json()
            this.setState({ engagement: data, role, loading: false })
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
            await fetchAcceptEngagement(id, this.state.comment)
            this.fetchSingleEngagement(id)
        } catch (err) {
            console.log(err)
            this.setState({ loading: false })
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
        if (!this.state.file) {
            alert("Please select file first")
            this.setState({ loading: false })
            return
        }
        try {
            // const doc = JSON.stringify(this.state.file)
            // console.log("Doc:", doc)
            const response = await fectchUploadReport(id, this.state.file)
            return this.fetchSingleEngagement(id)
        } catch (err) {
            this.setState({ loading: false })
            console.log(err)
        }

    }

    selectFile = async () => {
        this.setState({ loading: true })
        try {
            const response = await DocumentPicker.getDocumentAsync({});
            // consolog what was found
            console.log("Response:", response);
            if (!response.cancelled) {
                this.setState({ file: response, loading: false })
                return
            }
        } catch (error) {
            console.log("Error", error);
            this.setState({ loading: false })

        }
    };

    renderFileUploadView = () => {
        return (
            <View style={styles.uploadReport}>
                <View style={styles.reportButton}>
                    <View style={{ margin: 2 }}>
                        <Button color="#252757" title="Attach file" onPress={this.selectFile} />
                    </View>
                    <View style={{ margin: 2 }}>
                        <Button color="#252757" title="Upload" onPress={this.uploadReport} />
                    </View>
                </View>
                <View>
                    {this.state.file ? (
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
                <View key={index} style={{ flex: 1, height: '100%' }}>
                    <StatusBar backgroundColor="#252757" barStyle="light-content" />
                    <View style={styles.mainContainer}>
                        {this.state.loading ? (<View style={styles.loader}><Loader loading={this.state.loading} /></View>) : (<View />)}
                        <View style={{ flex: 1, }}>

                            <View style={{ alignContent: 'center', justifyContent: 'center', height: 50, backgroundColor: '#252757', borderColor: '#307ecc' }}>
                                <Text style={{ alignSelf: 'center', color: '#fff', fontSize: 20, fontFamily: 'sans-serif' }}>{val.engagement_type.toUpperCase()}</Text>
                            </View>
                            <ScrollView>
                                <View >
                                    <View style={styles.fullText}>
                                        <Text style={styles.message}>{val.reason_for_engagement}</Text>
                                    </View>
                                </View>

                                <View style={styles.modeStatus}>
                                    <Text style={styles.modeStatusText}>{val.mode_of_engagement.toUpperCase()}</Text>
                                    <Text style={styles.modeStatusText}>{val.status.toUpperCase()}</Text>
                                </View>

                                <View style={styles.modeStatus}>
                                    <Text style={styles.modeStatusText}>{val.proposed_date}</Text>
                                    <Text style={styles.modeStatusText}> {val.proposed_time}</Text>
                                </View>
                                {val.mentor_reject_comment !== "" &&
                                    <View >
                                        <View>
                                            <Text style={styles.comment}>Mentor's Comment</Text>
                                        </View>
                                        <View style={styles.fullText}>
                                            <Text style={styles.comment}>{val.mentor_reject_comment}</Text>
                                        </View>
                                    </View>
                                }

                                <View >
                                    <View>
                                        <Text style={styles.comment}>Engagement Task</Text>
                                    </View>
                                    <View style={styles.modeStatus}>
                                        <Text style={styles.comment}>{val.engagement_task}</Text>
                                        <Text style={styles.comment}>{val.task_type}</Text>
                                    </View>
                                </View>

                                <View style={styles.modeStatus}>
                                    <Text style={styles.comment}>Engagement Reported? </Text>
                                    {val.is_report_up !== "" ?
                                        <Text style={styles.comment}>{val.is_report_up} {val.report_date_submitted}</Text>
                                        : <Text style={styles.comment}>No</Text>
                                    }
                                </View>

                                {
                                    // val.report_uploaded
                                    val.is_report_up !== "" &&
                                    <TouchableOpacity
                                        onPress={() => { }}
                                        style={styles.button}>
                                        <Text style={styles.comment}>View Report</Text>
                                    </TouchableOpacity>
                                }

                                {val.Mentor_Closure_Comment !== "" &&
                                    <View>
                                        <View>
                                            <Text style={styles.comment}>Mentor's Closure Comment</Text>
                                        </View>
                                        <View style={styles.fullText}>
                                            <Text style={styles.comment}>{val.Mentor_Closure_Comment}</Text>
                                        </View>
                                    </View>
                                }


                                {this.state.role !== "mentee" && val.status === "Pending" ? (
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
                                        <View style={{ flexDirection: 'row', alignContent: 'center', justifyContent: 'space-between' }}>
                                            <TouchableOpacity onPress={this.acceptEngagement}
                                                style={styles.button} >
                                                <Text style={{ fontSize: 20, color: "#fff", margin: 2, }}>Accept</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => this.props.navigation.navigate("ModifyAccept", setEngID(val.engagement_ID))}
                                                style={styles.button} >
                                                <Text style={{ fontSize: 20, color: "#fff", margin: 2, }}>Modify & Accept</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>) : <View />}
                                {this.state.role === "mentee" && val.status === "Accepted" ?
                                    <View>
                                        <View style={{ marginTop: 2 }}>
                                            {this.renderFileUploadView()}
                                        </View>
                                    </View> :
                                    <View />}
                            </ScrollView>
                        </View>
                    </View>
                </View>
            )
        })
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        alignContent: 'center',
        backgroundColor: '#515265',
        height: '100%',
    },
    fullText: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#252757',
        borderRadius: 10,
        marginVertical: 10,
    },
    message: {
        margin: 4,
        justifyContent: 'space-between',
        fontSize: 16,
        color: '#ebeaf5'
    },
    modeStatus: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#252757',
        borderRadius: 10,
        marginHorizontal: 2,
        marginBottom: 10,
    },
    modeStatusText: {
        margin: 10,
        fontSize: 16,
        color: '#ebeaf5'
    },
    comment: {
        margin: 4,
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        fontSize: 16,
        color: '#ebeaf5',
        padding: 5,
    },
    engDetailsContainer: {
        margin: 2,
        backgroundColor: '#f2f2f2',
    },
    mapNameDetails: {
        margin: 2,
        width: '100%',
    },
    mapDetails: {
        margin: 2,
        width: '100%',
    },
    textAreaContainer: {
        borderColor: 'gray',
        borderWidth: 1,
        paddingRight: 5,
        margin: 5,
        borderRadius: 5,
        height: 120,
        backgroundColor: '#a3a3a3',
    },
    textArea: {
        width: '60%',
        justifyContent: 'flex-start',
    },
    uploadReport: {
        flexDirection: 'row',
        margin: 2,
        marginTop: 5
    },
    button: {
        margin: 5,
        backgroundColor: 'gray',
        width: '46%',
        height: 40,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
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