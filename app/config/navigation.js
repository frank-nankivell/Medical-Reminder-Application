import React from 'react';
import {createBottomTabNavigator} from 'react-navigation';

import Home from  '../screens/Home';
import First from  '../screens/First';
import Second from  '../screens/Second';

export const Tab = createBottomTabNavigator({
    Home: {
        screen: Home, 
    },
    First: {
        screen: First,
    },
    Second: {
        screen: Second,
    }
}, {
    tabBarPosition: 'bottom',
    swipeEnabled: true,
    tabBarOptions: {
        activeTintColor: 'white',
        activeBackgroundColor: 'pink',
        inactiveTintColor: 'grey',
        labelStyle: {
            fontSize: 22,
            padding:12
        }
    }
});
