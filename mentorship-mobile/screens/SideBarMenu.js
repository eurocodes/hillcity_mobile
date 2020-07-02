import React, { Component } from 'react';
import { Alert, AsyncStorage, StyleSheet, Text, View } from 'react-native';

const itemsMentor = [
    {
        navOptionName: "Close Drawer <<<",
        screenToNavigate: "home",
    },
    {
        navOptionName: "Dash Board",
        screenToNavigate: "DashBoard",
    },
    {
        navOptionName: 'My Engagements',
        screenToNavigate: 'Engagements',
    },
    {
        navOptionName: 'Logout',
        screenToNavigate: 'logout',
    },
];

const itemsMentee = [
    {
        navOptionName: "Close Drawer <<<",
        screenToNavigate: "home",
    },
    {
        navOptionName: "Dash Board",
        screenToNavigate: "DashBoard",
    },
    {
        navOptionName: 'My Engagements',
        screenToNavigate: 'Engagements',
    },
    {
        navOptionName: 'Start New Engagement',
        screenToNavigate: 'NewEngagement',
    },
    {
        navOptionName: 'Logout',
        screenToNavigate: 'logout',
    },
];

const itemsAdminMenu = [
    {
        navOptionName: "Manage Engagements",
        screenToNavigate: "ManageEngagements",
    },
    {
        navOptionName: 'Manage Mentors',
        screenToNavigate: 'ManageMentors',
    },
    {
        navOptionName: 'Manage Mentees',
        screenToNavigate: 'ManageMentees',
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
            AsyncStorage.clear();
            this.props.navigation.navigate("Signin")
            // this.props.navigation.toggleDrawer();
            Alert.alert(
                "Logout",
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
        } else {
            this.props.navigation.toggleDrawer();
            global.currentScreenIndex = screenToNavigate;
            this.props.navigation.navigate(screenToNavigate);
        }
    };

    render() {
        let items = []
        this.state.role === "mentee" ? items = itemsMentee : items = itemsMentor
        return (
            <View style={styles.sideMenuContainer}>
                <View style={styles.profileHeader}>
                    <View style={styles.profileHeaderPicCircle}>
                        <Text style={{ fontSize: 25, color: '#307ecc' }}>
                            {this.state.name.charAt(0)}
                        </Text>
                    </View>
                    <View>
                        <Text style={styles.profileHeaderText}>Hi, {this.state.name}</Text>
                        <Text style={styles.profileHeaderText2}>{this.state.greeting}</Text>
                    </View>
                </View>
                <View style={{ width: '100%', flex: 1 }}>
                    {items.map((item, key) => (
                        <View key={key}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    padding: 5,
                                    marginLeft: 12,
                                    backgroundColor:
                                        global.currentScreenIndex === item.screenToNavigate
                                            ? '#4b9ff2'
                                            : '#307ecc',
                                }}
                                key={key}
                                onStartShouldSetResponder={() =>
                                    this.handleClick(key, item.screenToNavigate)
                                }>
                                <Text style={{ fontSize: 15, color: 'white' }}>
                                    {item.navOptionName}
                                </Text>
                            </View>
                            <View style={styles.profileHeaderLine} />
                        </View>
                    ))}
                </View>
                {this.state.role === "adminmember" ? (
                    <View style={{ width: '100%', flex: 1 }}>
                        <View>
                            <Text style={{ fontSize: 15, color: 'white', marginLeft: 15, }}>ADMIN MANAGEMENT BOARD</Text>
                        </View>
                        <View style={styles.profileHeaderLine} />
                        {itemsAdminMenu.map((item, key) => (
                            <View key={key}>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        padding: 5,
                                        marginLeft: 12,
                                        backgroundColor:
                                            global.currentScreenIndex === item.screenToNavigate
                                                ? '#4b9ff2'
                                                : '#307ecc',
                                    }}
                                    key={key}
                                    onStartShouldSetResponder={() =>
                                        this.handleClick(key, item.screenToNavigate)
                                    }>
                                    <Text style={{ fontSize: 15, color: 'white' }}>
                                        {item.navOptionName}
                                    </Text>
                                </View>
                                <View style={styles.profileHeaderLine} />
                            </View>
                        ))}
                    </View>
                ) : (<View />)}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    sideMenuContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: '#307ecc',
        paddingTop: 20,
    },
    profileHeader: {
        flexDirection: 'row',
        backgroundColor: '#307ecc',
        padding: 5,
    },
    profileHeaderPicCircle: {
        width: 40,
        height: 40,
        borderRadius: 60 / 2,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileHeaderText: {
        color: 'white',
        paddingHorizontal: 10,
        marginRight: 2,
        fontSize: 20,
        fontWeight: 'bold',
    },
    profileHeaderText2: {
        color: 'white',
        alignSelf: 'flex-start',
        paddingHorizontal: 10,
        marginRight: 2,
        fontSize: 15,
    },
    profileHeaderLine: {
        height: 1,
        marginLeft: 12,
        backgroundColor: '#e2e2e2',
        marginTop: 2,
        marginBottom: 2,
    },
});

export default SideBarMenu;