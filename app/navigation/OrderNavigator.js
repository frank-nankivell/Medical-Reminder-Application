import { createStackNavigator } from 'react-navigation'
import React from 'react';
import Ordering from  '../screens/orderScreens/OrderHome';
import LoginLoading from  '../screens/loginScreens/LoginLoading';

const OrderNavigator = createStackNavigator({
  OrderHome: {
    screen: Ordering
  },
  Loading: {
    screen: LoginLoading
  }
});

export default OrderNavigator