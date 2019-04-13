import React, {Component} from 'react';
import {
    ScrollView,
    Text,
    View,
    Button,
    Image,
    AsyncStorage,
    ImageBackground,
    StyleSheet } from 'react-native';

import logo from '../../images/dna-purple.png';

export default class Splash extends Component {
    constructor() {
        super()
    }

    // Method to navigate to order form
  _orderTest = async () => {
    this.props.navigation.navigate('Order');
  };

  _navSignIn =  async () => {
    this.props.navigation.navigate('Auth');
  };

    render() {

            return (

                <View style ={styles.backgroundContainer}>

                    <Image 
                        source={logo}  
                        style ={styles.logo}/>

                    <Button
                    raised
                    style ={styles.logo}
                    title = "Order a test today"
                    color="white"
                    onPress={this._orderTest.bind(this)}
                    />
              
                    <Button
                    raised
                    style ={styles.buttonStyler}
                    title = "Login and check you results"
                    color="white"
                    onPress={this._navSignIn.bind(this)}
                    />

              </View>
            );
        };
    };

const styles = StyleSheet.create ({
    backgroundContainer: {
        flex: 1,
        width: null, 
        height: null,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#BA55D3'
      },
    text: 
        {
            fontSize: 50, 
            fontWeight: 'bold',
            textAlign: 'center',
            marginTop: 300
        },
        buttonStyler:
        {
            backgroundColor: 'pink',
            marginTop: 50,
            marginBottom: 10

        },
        logo: {
            width: 120,
            height: 120,
          }
});
