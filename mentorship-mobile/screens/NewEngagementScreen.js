import React, { Component, useState } from 'react';
import { AsyncStorage, Button, Dimensions, Platform, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Dropdown } from 'react-native-material-dropdown';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Constants from 'expo-constants';

import { createEngagement } from '../Backend/API';
import Loader from '../components/Loader';

let engagementType = [{
    value: "GENERAL WELL BEING",
}, {
    value: "LIFE GOALS & VISION",
}, {
    value: "ACADEMIC COUNSELLING",
}, {
    value: "PRINCIPLES & VALUES",
},
]

let engagementMode = [{
    value: "Technology Enabled",
}, {
    value: "Face to face",
}, {
    value: "Phone call",
},
]

const expoPushTokenMy = 'ExponentPushToken[yrgo07JkPGQ_FoSKbCjqVw]';
const pushTokenCheta = 'ExponentPushToken[7SGg51N6Y_YoR2JImvzAON]';

export default class NewEngagement extends Component {

    state = {
        engagementType: '',
        reasonForEngagement: '',
        engagementMode: '',
        date: '',
        time: '',
        isDatePickerVisible: false,
        isTimePickerVisible: false,
        loading: false,
    }

    showDatePicker = () => {
        this.setState({ isDatePickerVisible: true });
    }

    showTimePicker = () => {
        this.setState({ isTimePickerVisible: true });
    }

    hideDatePicker = () => {
        this.setState({ isDatePickerVisible: false });
    }

    hideTimePicker = () => {
        this.setState({ isTimePickerVisible: false });
    }

    handleConfirmDate = date => {
        alert("Click OK to confirm", date)
        this.setState({ date })
        this.hideDatePicker()
    }

    handleConfirmTime = time => {
        alert("Click OK to confirm", time)
        this.setState({ time })
        this.hideTimePicker()
    }

    createNewEngagement = async (expoPushToken) => {
        this.setState({ loading: true })
        try {
            if (this.state.engagementType !== "" && this.state.engagementMode !== "" &&
                this.state.reasonForEngagement !== "" && this.state.date !== "" &&
                this.state.time !== "") {
                await createEngagement(this.state.engagementType, this.state.engagementMode,
                    this.state.reasonForEngagement, this.state.date, this.state.time)
                this.setState({ loading: false })
                this.sendPushNotification(expoPushToken);
                this.props.navigation.navigate("Engagements")
                return
            }
            alert("You haven't properly filled all fields")
            this.setState({ loading: false })
            return
        } catch (err) {
            this.setState({ loading: false })
            console.log(err)
        }
    }

    setEngagementType = (value) => {
        this.setState({ engagementType: value })
    }

    setEngagementMode = (value) => {
        this.setState({ engagementMode: value })
    }

    handleInputText = key => val => {
        this.setState({ [key]: val })
    }

    // Can use this function below, OR use Expo's Push Notification Tool-> https://expo.io/dashboard/notifications
    sendPushNotification = async (expoPushToken) => {
        const message = {
            to: expoPushToken,
            sound: 'default',
            title: 'New Engagement created',
            body: 'Your mentee has created a new engagement',
            data: { data: 'goes here' },
        };

        await fetch('https://exp.host/--/api/v2/push/send', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Accept-encoding': 'gzip, deflate',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(message),
        });
    }

    render() {
        return (
            <ScrollView style={styles.mainContainer}>
                <StatusBar backgroundColor='#252757' barStyle='light-content' />
                <View>
                    <View style={styles.header}>
                        <Text style={styles.headerText}>Create a new engagement with your mentor</Text>
                    </View>
                    <View style={styles.selectMenu}>
                        <View>
                            <Text style={styles.selectMenuText}>Select Engagement type</Text>
                        </View>
                        <View>
                            <Dropdown
                                data={engagementType}
                                value={this.state.engagementType}
                                itemColor={"red"}
                                useNativeDriver={true}
                                onChangeText={(value, index, data) => this.setEngagementType(value)}
                            />
                        </View>
                    </View>

                    <View style={styles.selectMenu}>
                        <View>
                            <Text style={styles.selectMenuText}>Reason for this Engagement</Text>
                        </View>
                        <View style={styles.textAreaContainer}>
                            <TextInput
                                style={styles.textArea}
                                placeholder='In not less than 100 words, why do you need this engagement'
                                placeholderTextColor='gray'
                                value={this.state.reasonForEngagement}
                                onChangeText={this.handleInputText("reasonForEngagement")}
                                multiline={true}
                            />

                        </View>
                    </View>

                    <View style={styles.selectMenu}>
                        {this.state.loading ? (<View style={styles.loader}><Loader loading={this.state.loading} /></View>) : (<View />)}
                        <View>
                            <Text style={styles.selectMenuText}>Mode of Engagement</Text>
                        </View>
                        <View>
                            <Dropdown
                                data={engagementMode}
                                value={this.state.engagementMode}
                                itemColor={"red"}
                                useNativeDriver={true}
                                onChangeText={(value, index, data) => this.setEngagementMode(value)}
                            />
                        </View>
                    </View>

                    <View style={styles.selectMenu}>
                        <View>
                            <Text style={styles.selectMenuText}>Proposed Date</Text>
                        </View>
                        <View>
                            <Button title="Choose Date" color="#252757" onPress={this.showDatePicker} />
                            <DateTimePickerModal
                                isVisible={this.state.isDatePickerVisible}
                                mode="date"
                                onConfirm={this.handleConfirmDate}
                                onCancel={this.hideDatePicker}
                            />
                        </View>
                    </View>

                    <View style={styles.selectMenu}>
                        <View>
                            <Text style={styles.selectMenuText}>Proposed time</Text>
                        </View>
                        <View >
                            <View>
                                <Button title="Choose Time" color="#252757" onPress={this.showTimePicker} />
                                <DateTimePickerModal
                                    isVisible={this.state.isTimePickerVisible}
                                    mode="time"
                                    onConfirm={this.handleConfirmTime}
                                    onCancel={this.hideTimePicker}
                                />
                            </View>
                        </View>
                    </View>

                    <TouchableOpacity
                        style={{
                            justifyContent: 'center',
                            alignSelf: 'center',
                            width: '98%',
                            height: 35,
                            marginVertical: 20,
                            borderRadius: 10,
                            backgroundColor: '#011f4b'
                        }} onPress={() => this.createNewEngagement(pushTokenCheta)}>
                        <Text style={{ fontSize: 15, alignSelf: 'center', padding: 5, color: "#e9eaec" }}>SUBMIT</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        )
    }
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignContent: 'center',
        backgroundColor: '#515265',
        height: '100%',
    },
    header: {
        marginVertical: 2,
        height: 40,
        justifyContent: 'center',
        backgroundColor: '#252757',
    },
    headerText: {
        alignSelf: 'center',
        color: '#fff',
        fontSize: 15,
        fontFamily: 'sans-serif',
    },
    selectMenu: {
        margin: 5,
        backgroundColor: '#a3a3a3',
        borderRadius: 5,
    },
    selectMenuText: {
        marginVertical: 2,
        fontSize: 15,
        fontFamily: 'sans-serif',
        color: '#252757',
    },
    textAreaContainer: {
        borderColor: 'gray',
        borderWidth: 1,
        paddingRight: 5,
        height: 100,
        margin: 5,
        borderRadius: 5,
    },
    textArea: {
        justifyContent: 'flex-start',
    },
    loader: {
        alignContent: 'center',
        alignSelf: 'center',
    },
})