import { createStackNavigator } from 'react-navigation'
import React from 'react';
import LocationHome from  '../screens/orderScreens/LocationHome';
import LoginLoading from  '../screens/loginScreens/LoginLoading';

const locationNavigator = createStackNavigator({
  LocationHome: {
    screen: LocationHome
  },
  Loading: {
    screen: LoginLoading
  }
});

export default locationNavigator;