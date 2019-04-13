import { createStackNavigator } from 'react-navigation'
import React from 'react';
import Splash from  '../screens/loginScreens/Splash';

const SplashNavigator = createStackNavigator({
  SplashHome: {
    screen: Splash
  }
});

export default SplashNavigator