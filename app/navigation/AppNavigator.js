import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import LoggedOutNavigator from './LoggedOutNavigator';
import AuthLoadingScreen from '../screens/LoginLoading';

export default createAppContainer(createSwitchNavigator({
  Auth: LoggedOutNavigator, // logged out Navigator
  Main: MainTabNavigator,
},
// logged in Navigator
));