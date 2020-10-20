import React, { Component } from 'react';
import { Alert, AsyncStorage, StyleSheet, Text, View } from 'react-native';
import { Drawer } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const items = [
    {
        navOptionName: "Dash Board",
        screenToNavigate: "DashBoard",
        iconName: "home-outline",
    },
    {
        navOptionName: 'Mentees',
        screenToNavigate: 'Profile',
        iconName: "account-multiple",
    },
    {
        navOptionName: 'Settings',
        screenToNavigate: 'Settings',
        iconName: "settings-outline",
    },
];

const itemsAdminMenu = [
    {
        navOptionName: "Manage Engagements",
        screenToNavigate: "ManageEngagements",
        iconName: "calendar-check-outline",
    },
    {
        navOptionName: 'Manage Mentors',
        screenToNavigate: 'ManageMentors',
        iconName: "briefcase-account-outline",
    },
    {
        navOptionName: 'Manage Mentees',
        screenToNavigate: 'ManageMentees',
        iconName: "briefcase-account-outline",
    },
];

const time = new Date().toTimeString().split(":");

class SideBarMenu extends Component {

    state = {
        name: '',
        role: '',
        greeting: '',
    }

    async componentDidMount() {
        const name = await this.getName()
        const role = await this.getUserRole()
        this.setState({ name, role })
        if (time[0] <= "02" || time[0] > "22") {
            this.setState({ greeting: "You should be in bed by now", })
            return
        } else if (time[0] <= "11") {
            this.setState({ greeting: "Good morning! Hope you had a great night", })
            return
        } else if (time[0] <= "18") {
            this.setState({ greeting: "How's your day going?", })
            return
        }
        this.setState({ greeting: "Good evening", })
        return
    }

    getName = async () => AsyncStorage.getItem("name");
    getUserRole = async () => AsyncStorage.getItem("role");


    handleClick = (index, screenToNavigate) => {
        if (screenToNavigate === "logout") {
            this.props.navigation.toggleDrawer();
            Alert.alert(
                "Wait!",
                "Are you sure You want to logout?",
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
        } else {
            this.props.navigation.toggleDrawer();
            global.currentScreenIndex = screenToNavigate;
            this.props.navigation.navigate(screenToNavigate);
        }
    };

    render() {
        return (
            <View style={styles.sideMenuContainer}>
                <View style={styles.profileHeader}>
                    <View style={styles.profileHeaderPicCircle}>
                        <Text style={{ fontSize: 25, color: 'gray' }}>
                            {this.state.name.charAt(0)}
                        </Text>
                    </View>
                    <View style={{ width: '100%' }}>
                        <Text style={styles.profileHeaderText}>Hi, {this.state.name}</Text>
                        <Text style={styles.profileHeaderText2}>{this.state.greeting}</Text>
                    </View>
                </View>
                <Drawer.Section style={styles.drawerSection}>
                    {items.map((item, key) => (
                        <View key={key}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    padding: 5,
                                    marginLeft: 12,
                                    paddingBottom: 15,
                                    backgroundColor:
                                        global.currentScreenIndex === item.screenToNavigate
                                            ? '#aaa'
                                            : '#fff',
                                }}
                                key={key}
                                onStartShouldSetResponder={() =>
                                    this.handleClick(key, item.screenToNavigate)
                                }>
                                <MaterialCommunityIcons name={item.iconName} size={26} color='#252757' style={{ paddingLeft: 40, }} />
                                <Text style={{ fontSize: 15, marginRight: 70, color: '#252757' }}>
                                    {
                                        key === 1 && this.state.role === 'mentee' ? "Mentor's Profile" :
                                            item.navOptionName
                                    }
                                </Text>
                            </View>
                            <View style={styles.profileHeaderLine} />
                        </View>
                    ))}
                </Drawer.Section>
                {this.state.role === "adminmember" ? (
                    <View style={[styles.bottomDrawerSection, { width: '100%', flex: 1 }]}>
                        <View>
                            <Text style={{ fontSize: 15, color: 'white', marginLeft: 15, }}>ADMIN MANAGEMENT BOARD</Text>
                        </View>
                        <View style={styles.profileHeaderLine} />
                        {itemsAdminMenu.map((item, key) => (
                            <View key={key}>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        padding: 5,
                                        marginLeft: 12,
                                        paddingBottom: 15,
                                        backgroundColor:
                                            global.currentScreenIndex === item.screenToNavigate
                                                ? '#aaa'
                                                : '#fff',
                                    }}
                                    key={key}
                                    onStartShouldSetResponder={() =>
                                        this.handleClick(key, item.screenToNavigate)
                                    }>
                                    <MaterialCommunityIcons name={item.iconName} size={26} color='#252757' style={{ paddingLeft: 40, }} />
                                    <Text style={{ fontSize: 15, marginRight: 20, color: '#252757' }}>
                                        {item.navOptionName}
                                    </Text>
                                </View>
                                <View style={styles.profileHeaderLine} />
                            </View>
                        ))}
                    </View>
                ) : (<View />)}

                <Drawer.Section style={[styles.bottomDrawerSection, { flex: 1 }]}>

                    <View>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: 5,
                                marginLeft: 12,
                                paddingBottom: 15,
                                backgroundColor: '#fff'
                            }}
                            onStartShouldSetResponder={() =>
                                this.handleClick('any', 'logout')
                            }>
                            <MaterialCommunityIcons name='exit-to-app' size={26} color='#252757' style={{ paddingLeft: 40, }} />
                            <Text style={{ fontSize: 15, marginRight: 70, color: '#252757' }}>
                                Logout
                                </Text>
                        </View>
                        <View style={styles.profileHeaderLine} />
                    </View>

                </Drawer.Section>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    sideMenuContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
        paddingTop: 20,
    },
    profileHeader: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        marginTop: 20,
        padding: 5,
    },
    profileHeaderPicCircle: {
        width: 40,
        height: 40,
        borderRadius: 60 / 2,
        backgroundColor: '#aaa',
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileHeaderText: {
        paddingHorizontal: 10,
        marginRight: 2,
        fontSize: 20,
        marginBottom: 10,
        fontWeight: 'bold',
        color: '#252757',
    },
    profileHeaderText2: {
        alignSelf: 'flex-start',
        paddingHorizontal: 10,
        width: '90%',
        fontSize: 15,
        color: '#252757',
    },
    profileHeaderLine: {
        height: 1,
        marginLeft: 12,
        backgroundColor: '#e2e2e2',
        marginTop: 2,
        marginBottom: 2,
    },
    drawerSection: {
        marginTop: 25,
    },
    bottomDrawerSection: {
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1,
        justifyContent: 'flex-end',
    },
});

export default SideBarMenu;