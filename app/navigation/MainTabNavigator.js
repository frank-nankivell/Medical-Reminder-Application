import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons'
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons'

import {Platform } from 'react-native';
import { createStackNavigator, HeaderBackButton, createBottomTabNavigator, tabBarOptions} from 'react-navigation';

import HomeScreen from  '../screens/mainScreens/Home';
import MedicationScreen from '../screens/mainScreens/Medication';
import LocationScreen from  '../screens/orderScreens/LocationHome';

const tintColor = 'white'
const HomeStack = createStackNavigator({
    Home: HomeScreen,

  });
  
  HomeStack.navigationOptions = ({ navigation }) => ({
    headerLeft: <HeaderBackButton onPress={() => navigation.goBack(null)}/>,
    tabBarLabel: 'Home',
    tabBarIcon: ({ tintColor }) => (
      <Icon name="ios-home" size={35}/>
    )
});

  const MedicationStack = createStackNavigator({
    Medication: MedicationScreen,
    headerTitle: 'Medication',
  });
  
  MedicationStack.navigationOptions = {
    headerLeft: <HeaderBackButton onPress={() => navigation.goBack(null)}/>,
    tabBarLabel: 'Add reminder',
    tabBarIcon: ({ tintColor }) => (
      <Icon name="ios-add-circle" size={50}/>
    )
  };

  // Results Navigation 
  const LocationStack = createStackNavigator({

    Location: LocationScreen,
  });
  
  LocationStack.navigationOptions = {
    headerLeft: <HeaderBackButton onPress={() => navigation.goBack(null)}/>,
    tabBarLabel: 'Pharmacy finder',
    tabBarIcon: ({ tintColor }) => (
      <Icon2 name="medical-bag" size={35}/>
    )
  };

  
  export default createBottomTabNavigator({
    HomeStack,  
    MedicationStack,
    LocationStack

  }, {
  tabBarPosition: 'bottom',
    tabBarOptions: {
      activeTintColor: 'pink',
      activeBackgroundColor: '#6EC3CF',
      pressOpacity: 0.75,
      inactiveTintColor: 'white',
      size: 25,
      //Colors.tabbarNormal,
      swipeEnabled: true,
      showLabel: true,
      showIcon: true,
      style: {
        backgroundColor: '#6EC3CF',
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
  