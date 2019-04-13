import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import LoggedOutNavigator from './LoggedOutNavigator';
import OrderNavigator from './OrderNavigator';
import SplashNavigator from './SplashNavigator';

export default createAppContainer(createSwitchNavigator({
  Splash: SplashNavigator,
  Auth: LoggedOutNavigator, // logged out Navigator
  Main: MainTabNavigator,
  Order: OrderNavigator
},
// logged in Navigator
));