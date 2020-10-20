import React from 'react';
import { Image } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import MaIcon from '@expo/vector-icons/MaterialCommunityIcons'

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
import ManageEngagementsScreen from '../screensAdmin/ManageEngagementsScreen';
import ManageMentorsScreen from '../screensAdmin/ManageMentorsScreen';
import ManageMenteesScreen from '../screensAdmin/ManageMenteesScreen';
import ModifyAcceptEngagement from './ModifyAcceptEng';
import MyProfileScreen from './MyProfileScreen';
import SettingsScreen from './SettingsScreen';
import NotificationScreen from './NotificationScreen';
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


// const SettingsNavigator = createStackNavigator({
//     Settings: {
//         screen: SettingsStack,
//         navigationOptions: ({ navigation }) => ({
//             title: 'Settings',
//             headerStyle: {
//                 backgroundColor: '#252757',
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
                backgroundColor: '#252757',
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
            tabBarIcon: <MaIcon name='checkbox-blank-outline' size={20} color='#252757' />,
            tabBarLabel: 'Active',
            tabBarOptions: {
                activeBackgroundColor: '#fff',
                inactiveBackgroundColor: '#f0edf6',
                activeTintColor: '#252757',
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
            tabBarIcon: <MaIcon name='checkbox-marked-outline' size={20} color='#252757' />,
            tabBarOptions: {
                activeBackgroundColor: '#fff',
                inactiveBackgroundColor: '#f0edf6',
                activeTintColor: '#252757',
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

    UserDetails: {
        screen: MyProfileScreen,
        navigationOptions: {
            tabBarIcon: <Entypo name='user' size={20} color='#252757' />,
            tabBarLabel: 'Profile',
            tabBarOptions: {
                activeBackgroundColor: '#fff',
                inactiveBackgroundColor: '#f0edf6',
                activeTintColor: '#252757',
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
            title: '',
            headerLeft: () => <NavigationDrawerHeader navigationProps={navigation} />,
            headerStyle: {
                backgroundColor: '#252757',
            },
            headerTintColor: '#252757',
            headerTitleAlign: 'center',
        }),
    },
    SingleEngagement: {
        screen: SingleEngagementStack,
        navigationOptions: ({ navigation }) => ({
            title: '',
            headerShown: false,
            headerStyle: {
                backgroundColor: '#252757',
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
                backgroundColor: '#252757',
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
                backgroundColor: '#252757',
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
                backgroundColor: '#252757',
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
                backgroundColor: '#252757',
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
                backgroundColor: '#252757',
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
                backgroundColor: '#252757',
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
                backgroundColor: '#252757',
            },
            headerTintColor: '#fff',
            headerTitleAlign: 'center',
        }),
    },
});

// const ProfileStack = createBottomTabNavigator({
//     UserProfile: {
//         screen: UserDetailsScreen,
//         navigationOptions: {
//             tabBarOptions: {
//                 showLabel: false,
//                 activeBackgroundColor: '#fff',
//                 inactiveBackgroundColor: '#f0edf6',
//                 activeTintColor: '#252757',
//                 labelStyle: {
//                     fontSize: 15,
//                     marginBottom: 10,
//                 },
//                 tabStyle: {
//                     width: 100,
//                 },
//                 style: { backgroundColor: '#aaa' },
//             },
//         }

//     },
// });

const ProfileNavigatorStack = createStackNavigator({
    Profile: {
        screen: UserDetailsScreen,
        navigationOptions: ({ navigation }) => ({
            title: 'Profile',
            headerLeft: () => <NavigationDrawerHeader navigationProps={navigation} />,
            headerStyle: {
                backgroundColor: '#252757',
            },
            headerTintColor: '#fff',
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
        screen: DashBoardStack,
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