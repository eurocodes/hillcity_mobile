import React from 'react';
import { Alert, AsyncStorage, StyleSheet, Text, View } from 'react-native';

const SideBarMenu = props => {
    let items = [
        {
            navOptionName: "HILLCITY MOBILE",
            screenToNavigate: "home",
        },
        {
            navOptionName: "DashBoard",
            screenToNavigate: "DrawerNavigation",
        },
        {
            navOptionName: 'My Engagements',
            screenToNavigate: 'EngagementScreen',
        },
        {
            navOptionName: 'Logout',
            screenToNavigate: 'logout',
        },
    ];

    const handleClick = (index, screenToNavigate) => {
        if (screenToNavigate === "logout") {
            AsyncStorage.clear();
            props.navigation.navigate("Signin")
            // props.navigation.toggleDrawer();
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
                            props.navigation.navigate("Signin")
                            console.log("Logged out");
                        },
                    },
                ],
                { cancelable: false }
            );
        } else {
            props.navigation.toggleDrawer();
            global.currentScreenIndex = screenToNavigate;
            props.navigation.navigate(screenToNavigate);
        }
    };

    return (
        <View style={stylesSidebar.sideMenuContainer}>
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
                                handleClick(key, item.screenToNavigate)
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
    profileHeaderLine: {
        height: 1,
        marginLeft: 12,
        backgroundColor: '#e2e2e2',
        marginTop: 5,
        marginBottom: 5,
    },
});

export default SideBarMenu;