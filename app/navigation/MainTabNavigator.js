import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons'
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons'


import {Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, tabBarOptions} from 'react-navigation';

import HomeScreen from  '../screens/mainScreens/Home';
import Workflow from  '../screens/mainScreens/Workflow';
import Results  from  '../screens/mainScreens/Results';
import Panels from '../screens/mainScreens/Panels';


import logo from '../images/dna-purple.png';

const HomeStack = createStackNavigator({
    Home: HomeScreen,

  });
  
  HomeStack.navigationOptions = {
    tabBarLabel: 'Home',
    tabBarIcon: ({ tintColor }) => (
      <Icon name="ios-home" size={35}/>
    )
};


  const WorkflowStack = createStackNavigator({
    Workflow: Workflow,

    
  });
  
  WorkflowStack.navigationOptions = {
    tabBarLabel: 'Workflow',
    tabBarIcon: ({ tintColor }) => (
      <Icon name="md-reorder" size={35}/>
    )
  };

  // Results Navigation 
  const ResultStack = createStackNavigator({
    Results: Results,
  });
  
  ResultStack.navigationOptions = {
    tabBarLabel: 'Results',
    tabBarIcon: ({ tintColor }) => (
      <Icon2 name="dna" size={35}/>
    )
  };

    // Panels Navigation 
    const PanelsStack = createStackNavigator({
      Panels: Panels,
    });
    
    PanelsStack.navigationOptions = {
      tabBarLabel: 'Panels',
      tabBarIcon: ({ tintColor }) => (
        <Icon name= "ios-list-box" size={35}/>
      )
    };
    
  
  
  export default createBottomTabNavigator({
    HomeStack,  
    WorkflowStack,
    ResultStack,
    PanelsStack,

  }, {
  tabBarPosition: 'bottom',
    tabBarOptions: {
      activeTintColor: 'pink',
      activeBackgroundColor: '#BA55D3',
      pressOpacity: 0.75,
      inactiveTintColor: 'white',
      size: 25,
      //Colors.tabbarNormal,
      swipeEnabled: true,
      showLabel: true,
      showIcon: true,
      style: {
        backgroundColor: 'BA55D3',
        size: 25,
        paddingVertical: 10,
        opacity:0.75,
        height: 70
      },
      indicatorStyle: {
        backgroundColor: 'white',
      }
    }
  }

);
  