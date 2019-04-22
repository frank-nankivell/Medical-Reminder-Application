import { createStackNavigator } from 'react-navigation'
import React from 'react';
import Login from  '../screens/loginScreens/Login';

const LoggedOutNavigator = createStackNavigator({
  Login: {
    screen: Login
  }
});

export default LoggedOutNavigator