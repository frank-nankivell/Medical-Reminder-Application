import { createStackNavigator } from 'react-navigation'
import React from 'react';
import Login from  '../screens/Login';
import LoginLoading from  '../screens/LoginLoading';

const LoggedOutNavigator = createStackNavigator({
  Login: {
    screen: Login
  },
  Loading: {
    screen: LoginLoading
  }
});

export default LoggedOutNavigator