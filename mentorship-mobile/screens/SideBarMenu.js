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

class SideBarMenu extends Component {

    state = {
        name: '',
        role: '',
    }

    async componentDidMount() {
        const name = await this.getName()
        const role = await this.getUserRole()
        this.setState({ name, role })
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
                        <Text style={styles.profileHeaderText2}>Welcome back</Text>
                    </View>
                </View>
                <View style={{ width: '100%', flex: 1 }}>
                    {/* {this.state.role === "mentee" ? this.renderMenteeSideBar() : this.renderMentorSideBar()} */}
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
        alignSelf: 'center',
        paddingHorizontal: 10,
        fontSize: '130%',
        fontWeight: 'bold',
    },
    profileHeaderText2: {
        color: 'white',
        alignSelf: 'flex-start',
        paddingHorizontal: 10,
        fontWeight: 'bold',
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