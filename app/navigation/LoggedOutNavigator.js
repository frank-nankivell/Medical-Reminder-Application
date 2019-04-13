import { createStackNavigator } from 'react-navigation'
import React from 'react';
import Login from  '../screens/loginScreens/Login';
import LoginLoading from  '../screens/loginScreens/LoginLoading';

const LoggedOutNavigator = createStackNavigator({
  Login: {
    screen: Login
  },
  Loading: {
    screen: LoginLoading
  }
});

export default LoggedOutNavigator