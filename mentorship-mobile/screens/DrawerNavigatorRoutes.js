import React from 'react';
import { Image } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';

//Import Navigators
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createBottomTabNavigator } from 'react-navigation-tabs';

//Import External Screens
import SideBarMenu from './SideBarMenu';
import DashBoardScreen from './Dashboard';
import UserDetailsScreen from './UserDetailsScreen';
import NavigationDrawerHeader from '../components/NavigationDrawerHeader';
import SingleEngagement from './SingleEngagementScreen';
import NewEngagement from './NewEngagementScreen';
import AdminPanel from './AdminPanelScreen';
import ManageEngagementsScreen from '../screensAdmin/ManageEngagementsScreen';
import ManageMentorsScreen from '../screensAdmin/ManageMentorsScreen';
import ManageMenteesScreen from '../screensAdmin/ManageMenteesScreen';
import ModifyAcceptEngagement from './ModifyAcceptEng';
import MyProfileScreen from './MyProfileScreen';
import SettingsScreen from './SettingsScreen';
import NotificationScreen from './NotificationScreen';

import logo from '../assets/logo.png';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AdminCompletedScreen from './AdminCompletedScreen';
import CompletedScreen from './CompletedScreen';

const SingleEngagementStack = createStackNavigator({
    SingleEngagement: {
        screen: SingleEngagement,
        navigationOptions: {
            headerShown: false,
        }

    }
});

const NewEngagementStack = createStackNavigator({
    NewEngagement: {
        screen: NewEngagement,
        navigationOptions: {
            headerShown: false,
        }

    }
});

const ModifyAcceptEngagementStack = createStackNavigator({
    ModifyAccept: {
        screen: ModifyAcceptEngagement,
        navigationOptions: {
            headerShown: false,
        }

    }
});

const SettingsStack = createStackNavigator({
    Settings: {
        screen: SettingsScreen,
        navigationOptions: {
            headerShown: false,
        }

    }
});

// const SettingsNavigator = createStackNavigator({
//     Settings: {
//         screen: SettingsStack,
//         navigationOptions: ({ navigation }) => ({
//             title: 'Settings',
//             headerStyle: {
//                 backgroundColor: '#307ecc',
//             },
//             headerTintColor: '#fff',
//             headerTitleAlign: 'center',
//         }),
//     }
// });

const NotificationStack = createStackNavigator({
    Notifications: {
        screen: NotificationScreen,
        navigationOptions: ({ navigation }) => ({
            title: 'Notifications',
            headerStyle: {
                backgroundColor: '#307ecc',
            },
            headerTintColor: '#fff',
            headerTitleAlign: 'center',
        }),
    }
});

const DashBoardNavigator = createBottomTabNavigator({
    DashBoard: {
        screen: DashBoardScreen,
        navigationOptions: {
            tabBarLabel: 'Active',
            tabBarOptions: {
                activeBackgroundColor: '#fff',
                inactiveBackgroundColor: '#f0edf6',
                activeTintColor: '#307ecc',
                labelStyle: {
                    fontSize: 15,
                    marginBottom: 10,
                },
                tabStyle: {
                    width: 100,
                },
                style: { backgroundColor: '#aaa' },
            },
        }
    },
    UserProfile: {
        screen: CompletedScreen,
        navigationOptions: {
            tabBarLabel: 'Completed',
            tabBarOptions: {
                activeBackgroundColor: '#fff',
                inactiveBackgroundColor: '#f0edf6',
                activeTintColor: '#307ecc',
                labelStyle: {
                    fontSize: 15,
                    marginBottom: 10,
                },
                tabStyle: {
                    width: 100,
                },
                style: { backgroundColor: '#aaa' },
            },
        }

    },
});

const DashBoardStack = createStackNavigator({
    DashBoard: {
        screen: DashBoardNavigator,
        navigationOptions: ({ navigation }) => ({
            title: 'My Engagements',
            headerLeft: () => <NavigationDrawerHeader navigationProps={navigation} />,
            headerStyle: {
                backgroundColor: '#fff',
            },
            headerTintColor: '#307ecc',
            headerTitleAlign: 'center',
        }),
    },
    SingleEngagement: {
        screen: SingleEngagementStack,
        navigationOptions: ({ navigation }) => ({
            title: 'Engagement',
            headerStyle: {
                backgroundColor: '#307ecc',
            },
            headerTintColor: '#fff',
            headerTitleAlign: 'center',
        }),
    },
    NewEngagement: {
        screen: NewEngagementStack,
        navigationOptions: ({ navigation }) => ({
            title: 'Start New Engagement',
            headerStyle: {
                backgroundColor: '#307ecc',
            },
            headerTintColor: '#fff',
            headerTitleAlign: 'center',
        }),
    },
    ModifyAccept: {
        screen: ModifyAcceptEngagementStack,
        navigationOptions: ({ navigation }) => ({
            title: 'Modify Engagement',
            headerStyle: {
                backgroundColor: '#307ecc',
            },
            headerTintColor: '#fff',
            headerTitleAlign: 'center',
        }),
    },
    Notifications: {
        screen: NotificationStack,
        navigationOptions: ({ navigation }) => ({
            title: 'Notifications',
            headerStyle: {
                backgroundColor: '#307ecc',
            },
            headerTintColor: '#fff',
            headerTitleAlign: 'center',
        }),
    },
    Settings: {
        screen: SettingsStack,
        navigationOptions: ({ navigation }) => ({
            title: 'Settings',
            headerStyle: {
                backgroundColor: '#307ecc',
            },
            headerTintColor: '#fff',
            headerTitleAlign: 'center',
        }),
    }
});

const ManageEngagementsStack = createStackNavigator({
    ManageEngagements: {
        screen: ManageEngagementsScreen,
        navigationOptions: {
            headerShown: false,
        }

    },
});

const ManageMentorsStack = createStackNavigator({
    ManageMentors: {
        screen: ManageMentorsScreen,
        navigationOptions: {
            headerShown: false,
        }

    },
});

const ManageMenteesStack = createStackNavigator({
    ManageMentees: {
        screen: ManageMenteesScreen,
        navigationOptions: {
            headerShown: false,
        }

    },
});

const AdminDashBoardNavigator = createBottomTabNavigator({
    DashBoard: {
        screen: AdminPanel,
        navigationOptions: {
            tabBarLabel: 'Active',
            tabBarOptions: {
                activeBackgroundColor: '#fff',
                inactiveBackgroundColor: '#f0edf6',
                activeTintColor: '#307ecc',
                labelStyle: {
                    fontSize: 15,
                    marginBottom: 10,
                },
                tabStyle: {
                    width: 100,
                },
                style: { backgroundColor: '#aaa' },
            },
        }
    },
    UserProfile: {
        screen: AdminCompletedScreen,
        navigationOptions: {
            tabBarLabel: 'Completed',
            tabBarOptions: {
                activeBackgroundColor: '#fff',
                inactiveBackgroundColor: '#f0edf6',
                activeTintColor: '#307ecc',
                labelStyle: {
                    fontSize: 15,
                    marginBottom: 10,
                },
                tabStyle: {
                    width: 100,
                },
                style: { backgroundColor: '#aaa' },
            },
        }

    },
});

const AdminDasboardStack = createStackNavigator({
    AdminDashboard: {
        screen: AdminDashBoardNavigator,
        navigationOptions: ({ navigation }) => ({
            title: "Admin Dashboard",
            headerLeft: () => <NavigationDrawerHeader navigationProps={navigation} />,
            headerStyle: {
                backgroundColor: '#fff',
            },
            headerTintColor: '#307ecc',
            headerTitleAlign: 'center',
        }),
    },
    SingleEngagement: {
        screen: SingleEngagementStack,
        navigationOptions: ({ navigation }) => ({
            title: 'Engagement',
            headerStyle: {
                backgroundColor: '#307ecc',
            },
            headerTintColor: '#fff',
            headerTitleAlign: 'center',
        }),
    },
    ManageEngagemente: {
        screen: ManageEngagementsStack,
        navigationOptions: ({ navigation }) => ({
            title: 'Manage All Engagement',
            headerStyle: {
                backgroundColor: '#307ecc',
            },
            headerTintColor: '#fff',
            headerTitleAlign: 'center',
        }),
    },
    ManageMentors: {
        screen: ManageMentorsStack,
        navigationOptions: ({ navigation }) => ({
            title: 'Manage Mentors',
            headerStyle: {
                backgroundColor: '#307ecc',
            },
            headerTintColor: '#fff',
            headerTitleAlign: 'center',
        }),
    },
    ManageMentees: {
        screen: ManageMenteesStack,
        navigationOptions: ({ navigation }) => ({
            title: 'Manage Mentees',
            headerStyle: {
                backgroundColor: '#307ecc',
            },
            headerTintColor: '#fff',
            headerTitleAlign: 'center',
        }),
    },
    Notifications: {
        screen: NotificationStack,
        navigationOptions: ({ navigation }) => ({
            title: 'Notifications',
            headerStyle: {
                backgroundColor: '#307ecc',
            },
            headerTintColor: '#fff',
            headerTitleAlign: 'center',
        }),
    },
    Settings: {
        screen: SettingsStack,
        navigationOptions: ({ navigation }) => ({
            title: 'Settings',
            headerStyle: {
                backgroundColor: '#307ecc',
            },
            headerTintColor: '#fff',
            headerTitleAlign: 'center',
        }),
    }
});

const ProfileStack = createBottomTabNavigator({
    UserDetails: {
        screen: MyProfileScreen,
        navigationOptions: {
            tabBarLabel: 'My Profile',
            tabBarOptions: {
                activeBackgroundColor: '#fff',
                inactiveBackgroundColor: '#f0edf6',
                activeTintColor: '#307ecc',
                labelStyle: {
                    fontSize: 15,
                    marginBottom: 10,
                },
                tabStyle: {
                    width: 100,
                },
                style: { backgroundColor: '#aaa' },
            },
        }

    },
    UserProfile: {
        screen: UserDetailsScreen,
        navigationOptions: {
            tabBarLabel: 'My Mentor/Mentee(s)',
            tabBarOptions: {
                activeBackgroundColor: '#fff',
                inactiveBackgroundColor: '#f0edf6',
                activeTintColor: '#307ecc',
                labelStyle: {
                    fontSize: 15,
                    marginBottom: 10,
                },
                tabStyle: {
                    width: 100,
                },
                style: { backgroundColor: '#aaa' },
            },
        }

    },
});

const ProfileNavigatorStack = createStackNavigator({
    Profile: {
        screen: ProfileStack,
        navigationOptions: ({ navigation }) => ({
            title: 'Profile',
            headerLeft: () => <NavigationDrawerHeader navigationProps={navigation} />,
            headerStyle: {
                backgroundColor: '#fff',
            },
            headerTintColor: '#307ecc',
            headerTitleAlign: 'center',
        }),
    },
})

const DrawerNavigatorRoutes = createDrawerNavigator({
    DashBoard: {
        screen: DashBoardStack,
        navigationOptions: {
            drawerLabel: 'DashBoard',
        },
    },
    Profile: ProfileNavigatorStack,
    Notifications: NotificationStack,
},
    {
        contentComponent: SideBarMenu,
        drawerOpenRoute: 'DrawerOpen',
        drawerCloseRoute: 'DrawerClose',
        drawerToggleRoute: 'DrawerToggle',
    }
);

const AdminDrawerNavigatorRoutes = createDrawerNavigator({
    DashBoard: {
        screen: AdminDasboardStack,
        navigationOptions: {
            drawerLabel: 'Admin DashBoard',
        },
    },
    Profile: ProfileNavigatorStack,
    Notifications: NotificationStack,
},
    {
        contentComponent: SideBarMenu,
        drawerOpenRoute: 'DrawerOpen',
        drawerCloseRoute: 'DrawerClose',
        drawerToggleRoute: 'DrawerToggle',
    }
);

// export { EngagementsStack, SingleEngagementStack, DashBoardStack };

export { DrawerNavigatorRoutes, AdminDrawerNavigatorRoutes };