import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import SplashScreen from './screens/SplashScreen';
import SigninScreen from './screens/SigninScreen';
import { DrawerNavigatorRoutes, AdminDrawerNavigatorRoutes } from './screens/DrawerNavigatorRoutes';

const UserMainNavigator = createSwitchNavigator({
  DrawerNavigator: DrawerNavigatorRoutes,
});

const AdminMainNavigator = createSwitchNavigator({
  AdminDrawerNavigator: AdminDrawerNavigatorRoutes,
});

const AppNavigator = createSwitchNavigator({
  Splash: SplashScreen,
  Signin: SigninScreen,
  Main: UserMainNavigator,
  Admin: AdminMainNavigator,
},
  { initialRouteName: 'Splash' }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component {
  render() {
    return <AppContainer />
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
