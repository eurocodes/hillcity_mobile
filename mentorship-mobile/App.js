import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import HomeScreen from './screens/HomeScreen';
import SigninScreen from './screens/SigninScreen';
import DrawerNavigatorRoutes from './screens/DrawerNavigatorRoutes';

const MainNavigator = createSwitchNavigator({
  DrawerNavigator: DrawerNavigatorRoutes,
});

const AppNavigator = createSwitchNavigator({
  Home: HomeScreen,
  Signin: SigninScreen,
  Main: MainNavigator,
},
  { initialRouteName: 'Home' }
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
