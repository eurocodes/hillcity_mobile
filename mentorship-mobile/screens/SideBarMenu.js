import React, { Component } from 'react';
import { Alert, AsyncStorage, StyleSheet, Text, View } from 'react-native';

class SideBarMenu extends Component {

    state = {
        name: '',
    }

    async componentDidMount() {
        const name = await this.getName()
        this.setState({ name: name })
    }

    getName = async () => AsyncStorage.getItem("name");


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
        let items = [
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


        return (
            <View style={stylesSidebar.sideMenuContainer}>
                <View style={stylesSidebar.profileHeader}>
                    <View style={stylesSidebar.profileHeaderPicCircle}>
                        <Text style={{ fontSize: 25, color: '#307ecc' }}>
                            {this.state.name.charAt(0)}
                        </Text>
                    </View>
                    <View>
                        <Text style={stylesSidebar.profileHeaderText}>Hi, {this.state.name}</Text>
                        <Text style={stylesSidebar.profileHeaderText2}>Welcome back</Text>
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
                            <View style={stylesSidebar.profileHeaderLine} />
                        </View>
                    ))}
                </View>
            </View>
        );
    }
}

const stylesSidebar = StyleSheet.create({
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
        width: 60,
        height: 60,
        borderRadius: 60 / 2,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileHeaderText: {
        color: 'white',
        alignSelf: 'center',
        paddingHorizontal: 10,
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
        marginTop: 5,
        marginBottom: 5,
    },
});

export default SideBarMenu;