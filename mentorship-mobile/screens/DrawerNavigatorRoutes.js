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
import NewEngagement from './NewEngagementScreen'

const DashBoardStack = createStackNavigator({
    DashBoard: {
        screen: DashBoard,
        navigationOptions: ({ navigation }) => ({
            title: 'Your Dash Board',
            headerLeft: () => <NavigationDrawerHeader navigationProps={navigation} />,
            headerStyle: {
                backgroundColor: '#307ecc',
            },
            headerTintColor: '#fff',
            headerTitleAlign: 'center',
        }),
    },
});

const EngagementsStack = createStackNavigator({
    Engagements: {
        screen: Engagements,
        navigationOptions: {
            header: null,
        }

    },
});

const SingleEngagementStack = createStackNavigator({
    SingleEngagement: {
        screen: SingleEngagement,
        navigationOptions: {
            header: null,
        }

    }
});

const NewEngagementStack = createStackNavigator({
    SingleEngagement: {
        screen: NewEngagement,
        navigationOptions: {
            header: null,
        }

    }
});

const EngagementsNavigatorStack = createStackNavigator({
    Engagements: {
        screen: EngagementsStack,
        navigationOptions: ({ navigation }) => ({
            title: 'My Engagements',
            headerLeft: () => <NavigationDrawerHeader navigationProps={navigation} />,
            headerStyle: {
                backgroundColor: '#307ecc',
            },
            headerTintColor: '#fff',
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
})

const DrawerNavigatorRoutes = createDrawerNavigator(
    {
        DashBoard: {
            screen: DashBoardStack,
            navigationOptions: {
                drawerLabel: 'DashBoard',
            },
        },
        Engage: EngagementsNavigatorStack,
        // Engagements: {
        //     screen: EngagementsStack,
        //     navigationOptions: {
        //         drawerLabel: 'Engagements',
        //     },
        // },
        // SingleEngagement: {
        //     screen: SingleEngagementStack,
        //     navigationOptions: {
        //         drawerLabel: 'Engagement'
        //     }
        // }
    },
    {
        contentComponent: SideBarMenu,
        drawerOpenRoute: 'DrawerOpen',
        drawerCloseRoute: 'DrawerClose',
        drawerToggleRoute: 'DrawerToggle',
    }
);

// export { EngagementsStack, SingleEngagementStack, DashBoardStack };

export default DrawerNavigatorRoutes;