import React from 'react';

//Import Navigators
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';

//Import External Screens
import SideBarMenu from './SideBarMenu';
import DashBoard from './Dashboard';
import Engagements from './EngagementScreen';
import NavigationDrawerHeader from '../components/NavigationDrawerHeader';
import SingleEngagement from './SingleEngagementScreen';

const FirstActivity_StackNavigator = createStackNavigator({
    First: {
        screen: DashBoard,
        navigationOptions: ({ navigation }) => ({
            title: 'Dash Board',
            headerLeft: () => <NavigationDrawerHeader navigationProps={navigation} />,
            headerStyle: {
                backgroundColor: '#307ecc',
            },
            headerTintColor: '#fff',
        }),
    },
});

const SecondActivity_StackNavigator = createStackNavigator({
    First: {
        screen: Engagements,
        navigationOptions: ({ navigation }) => ({
            title: 'My Engagements',
            headerLeft: () => <NavigationDrawerHeader navigationProps={navigation} />,
            headerStyle: {
                backgroundColor: '#307ecc',
            },
            headerTintColor: '#fff',
        }),
    },
});

const ThirdActivity_StackNavigator = createStackNavigator({
    First: {
        screen: SingleEngagement,
        navigationOptions: ({ navigation }) => ({
            title: 'Engagement',
            headerLeft: () => <NavigationDrawerHeader navigationProps={navigation} />,
            headerStyle: {
                backgroundColor: '#307ecc',
            },
            headerTintColor: '#fff'
        }),
    }
});

const DrawerNavigatorRoutes = createDrawerNavigator(
    {
        DashBoard: {
            screen: FirstActivity_StackNavigator,
            navigationOptions: {
                drawerLabel: 'DashBoard',
            },
        },
        Engagements: {
            screen: SecondActivity_StackNavigator,
            navigationOptions: {
                drawerLabel: 'Engagements',
            },
        },
        SingleEngagement: {
            screen: ThirdActivity_StackNavigator,
            navigationOptions: {
                drawerLabel: 'Engagement'
            }
        }
    },
    {
        contentComponent: SideBarMenu,
        drawerOpenRoute: 'DrawerOpen',
        drawerCloseRoute: 'DrawerClose',
        drawerToggleRoute: 'DrawerToggle',
    }
);

export default DrawerNavigatorRoutes;