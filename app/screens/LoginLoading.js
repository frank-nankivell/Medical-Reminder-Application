import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
  Text,
} from 'react-native';

import logo from '../images/dna-purple.png';

class AuthLoadingScreen extends React.Component {
    constructor() {
      super();
      this._bootstrapAsync();
    }
  
    // Fetch the token from storage then navigate to our appropriate place
    _bootstrapAsync = async () => {
      const userToken = await AsyncStorage.getItem('userToken');
  
      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      this.props.navigation.navigate(userToken ? 'App' : 'Auth');
    };

    
  
    // Render any loading content that you like here
    render() {
      return (
        
   
        <View style={styles.container}>
          <ActivityIndicator />
          <StatusBar barStyle="default" />
          <Text style={styles.loadingText}> Loading....</Text> 
        </View>


      );
    }
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    loadingText: {
      color: 'purple',
      fontSize: 25,
      marginTop: 50,
      textAlign: 'center',
    }

  });

export default AuthLoadingScreen;