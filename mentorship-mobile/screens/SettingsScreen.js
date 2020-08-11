import * as React from 'react';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import { AsyncStorage, Text, View, Button, Platform, ScrollView, StyleSheet } from 'react-native';
import { Switch } from 'react-native-gesture-handler';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

const Notification = props => (
    <View style={[styles.notificationContainer, styles.fill]}>
        <Text style={styles.text}>{props.text}</Text>
        <View style={styles.switch}>
            <Switch value={props.checked} onValueChange={props.onToggle} />
        </View>
    </View>
);

export default class SettingsScreen extends React.Component {

    state = {
        checked: false,
        expoPushToken: '',
    }

    registerForPushNotificationsAsync = async () => {
        let token;
        if (Constants.isDevice) {
            const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
                const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
                finalStatus = status;
            }
            if (finalStatus !== 'granted') {
                alert('Failed to get push token for push notification!');
                return;
            }
            token = (await Notifications.getExpoPushTokenAsync()).data;
            this.setState({ expoPushToken: token })
            console.log(this.state.expoPushToken);
        } else {
            alert('Must use physical device for Push Notifications');
        }

        if (Platform.OS === 'android') {
            Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
        }

        return token;
    }

    toggleNotification = () => {
        this.setState({ checked: !this.state.checked });
        if (this.state.checked === false) {
            this.registerForPushNotificationsAsync()
        }
    }

    render() {
        return (
            <View style={[styles.screenContainer, styles.fill]}>
                <ScrollView style={styles.fill}>
                    <Notification
                        onToggle={this.toggleNotification}
                        checked={this.state.checked}
                        text='Enable Notification'
                    />

                    <View style={[styles.screenContainer, styles.fill]}>
                        <Button onPress={() => {
                            alert(
                                "Logged out",
                                "Are you sure?", "You want to logout?",
                                [
                                    {
                                        text: "Cancel",
                                        onPress: () => {
                                            return null;
                                        },
                                    },
                                    {
                                        text: "Confirm",
                                        onPress: () => {
                                            AsyncStorage.clear();
                                            this.props.navigation.navigate("Signin")
                                            console.log("Logged out");
                                        },
                                    },
                                ],
                                { cancelable: false }
                            );
                            AsyncStorage.clear();
                            this.props.navigation.navigate("Signin")
                            console.log("Logged out");
                        }}
                            title='Sign Out'
                        />

                        <Text>This Device token is:</Text>
                        <Text> {this.state.expoPushToken} </Text>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        marginHorizontal: 2,
        marginVertical: 4,
    },
    notificationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 2,
        backgroundColor: '#fff',
    },
    text: {
        fontSize: 15,
    },
    switch: {
        flex: 1,
        alignItems: 'flex-end',
    },
    fill: {
        flex: 1,
    },
});