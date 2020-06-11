import React from 'react';

//Import Navigators
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';

//Import External Screens
import SideBarMenu from './SideBarMenu';
import DashBoard from './Dashboard';
import NavigationDrawerHeader from '../components/NavigationDrawerHeader';

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

const DrawerNavigatorRoutes = createDrawerNavigator(
    {
        DashBoard: {
            screen: FirstActivity_StackNavigator,
            navigationOptions: {
                drawerLabel: 'DashBoard',
            },
        },
    },
    {
        contentComponent: SideBarMenu,
        drawerOpenRoute: 'DrawerOpen',
        drawerCloseRoute: 'DrawerClose',
        drawerToggleRoute: 'DrawerToggle',
    }
);

export default DrawerNavigatorRoutes;