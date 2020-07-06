import React from 'react';
import { Image } from 'react-native';

//Import Navigators
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';

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

import logo from '../assets/logo.png';

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

const DashBoardStack = createStackNavigator({
    DashBoard: {
        screen: DashBoardScreen,
        navigationOptions: ({ navigation }) => ({
            title: 'My Engagements',
            headerLeft: () => <NavigationDrawerHeader navigationProps={navigation} />,
            headerRight: () => <Image style={{ width: 80, height: 50 }}
                source={logo} />,
            headerStyle: {
                backgroundColor: '#fff',
            },
            headerTintColor: '#000',
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

const AdminDasboardStack = createStackNavigator({
    AdminDashboard: {
        screen: AdminPanel,
        navigationOptions: ({ navigation }) => ({
            title: "Admin Dashboard",
            headerLeft: () => <NavigationDrawerHeader navigationProps={navigation} />,
            headerRight: () => <Image style={{ width: 80, height: 50 }}
                source={logo} />,
            headerStyle: {
                backgroundColor: '#fff',
            },
            headerTintColor: '#000',
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
})

const ProfileStack = createStackNavigator({
    UserDetails: {
        screen: UserDetailsScreen,
        navigationOptions: {
            headerShown: false,
        }

    },
});

const ProfileNavigatorStack = createStackNavigator({
    Profile: {
        screen: ProfileStack,
        navigationOptions: ({ navigation }) => ({
            title: 'Profile',
            headerLeft: () => <NavigationDrawerHeader navigationProps={navigation} />,
            headerRight: () => <Image style={{ width: 80, height: 50 }}
                source={logo} />,
            headerStyle: {
                backgroundColor: '#fff',
            },
            headerTintColor: '#000',
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