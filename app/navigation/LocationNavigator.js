import { createStackNavigator } from 'react-navigation'
import React from 'react';
import LocationHome from  '../screens/orderScreens/LocationHome';

const locationNavigator = createStackNavigator({
  LocationHome: {
    screen: LocationHome
  }
});

export default locationNavigator;