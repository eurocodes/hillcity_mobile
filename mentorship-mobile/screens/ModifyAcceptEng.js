import React, { Component, useState } from 'react';
import { AsyncStorage, Button, Dimensions, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Constants from 'expo-constants';

import { fetchModifyAcceptEngagement } from '../Backend/API';
import Loader from '../components/Loader';


const getEngID = async () => AsyncStorage.getItem("id");

export default class ModifyAcceptEngagement extends Component {

    state = {
        comment: '',
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

    modifyAcceptEng = async () => {
        const id = await getEngID()
        console.log("Confirm ID:", id)
        this.setState({ loading: true })
        try {
            if (this.state.date !== "" && this.state.time !== "") {
                await fetchModifyAcceptEngagement(id, this.state.date, this.state.time, this.state.comment)
                this.setState({ loading: false })
                this.props.navigation.navigate("SingleEngagement")
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

    handleInputText = comment => {
        this.setState({ comment })
        console.log("Comment:", this.state.comment)
    }

    render() {
        return (
            <ScrollView style={styles.mainContainer}>
                <View>
                    <View style={styles.header}>
                        <Text style={styles.headerText}>Modify And Accept this Engagement</Text>
                    </View>

                    <View style={styles.selectMenu}>
                        <View>
                            <Text style={styles.selectMenuText}>New Date</Text>
                        </View>
                        <View>
                            <Button title="Choose Date" onPress={this.showDatePicker} />
                            <DateTimePickerModal
                                isVisible={this.state.isDatePickerVisible}
                                mode="date"
                                onConfirm={this.handleConfirmDate}
                                onCancel={this.hideDatePicker}
                            />
                        </View>
                    </View>

                    {this.state.loading ? (<View style={styles.loader}><Loader loading={this.state.loading} /></View>) : (<View />)}

                    <View style={styles.selectMenu}>
                        <View>
                            <Text style={styles.selectMenuText}>New time</Text>
                        </View>
                        <View >
                            <View>
                                <Button title="Choose Time" onPress={this.showTimePicker} />
                                <DateTimePickerModal
                                    isVisible={this.state.isTimePickerVisible}
                                    mode="time"
                                    onConfirm={this.handleConfirmTime}
                                    onCancel={this.hideTimePicker}
                                />
                            </View>
                        </View>
                    </View>

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

                    <TouchableOpacity style={{
                        justifyContent: 'center',
                        alignSelf: 'center',
                        width: '98%',
                        height: 35,
                        marginVertical: 20,
                        borderRadius: 10,
                        backgroundColor: '#011f4b'
                    }} onPress={this.modifyAcceptEng}>
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
        backgroundColor: '#e5e5e5',
        height: '100%',
    },
    header: {
        marginVertical: 2,
        height: 40,
        justifyContent: 'center',
        backgroundColor: '#307ecc',
    },
    headerText: {
        alignSelf: 'center',
        color: '#fff',
        fontSize: 15,
        fontFamily: 'sans-serif',
    },
    textAreaContainer: {
        borderColor: 'gray',
        borderWidth: 1,
        paddingRight: 5,
        margin: 5,
        borderRadius: 5,
        height: 60,
        backgroundColor: '#f2f2f2',
    },
    textArea: {
        width: '60%',
        justifyContent: 'flex-start',
    },
    loader: {
        alignContent: 'center',
        alignSelf: 'center',
    },
})