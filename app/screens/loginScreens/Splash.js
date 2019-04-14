import React, {Component} from 'react';
import {
    ScrollView,
    Text,
    View,
    Button,
    Image,
    Alert,
    Dimensions,
    TouchableOpacity,
    StyleSheet } from 'react-native';

import logo from '../../images/dna-purple.png';
const  { width: WIDTH} = Dimensions.get('window');

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

  _onPressAbout() {
    Alert.alert('This is a Participant app for Genomic tests. If you have already ordered a test then please login to check your results, otherwise order a test today and sign up!')
  }


    render() {

            return (
              <View style ={styles.backgroundContainer}>
                <Image 
                    source={logo}  
                    style ={styles.logo}/>
                <TouchableOpacity style={styles.btnTest}>
                    <Button
                    raised
                    style ={styles.logo}
                    title = "Order a genetic test"
                    color="#BA55D3"
                    onPress={this._orderTest.bind(this)}
                    />
               </TouchableOpacity>
               <TouchableOpacity style={styles.btnLogin}>
                    <Button
                    raised
                    style ={styles.buttonStyler}
                    title = "Login to check your results"
                    color="#BA55D3"
                    onPress={this._navSignIn.bind(this)}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.btnAbout}>
                    <Button
                    raised
                    style ={styles.buttonStyler}
                    title = "About"
                    color="white"
                    onPress={this._onPressAbout}
                    />
                  </TouchableOpacity>

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
      color: '#BA55D3',
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
      },
      btnLogin: {
        width: WIDTH -55,
        height: 45,
        borderRadius: 45,
        backgroundColor: 'white',
        justifyContent: 'center',
        marginTop: 30,
        opacity: 0.75
      },
      btnTest: {
        width: WIDTH -55,
        height: 45,
        borderRadius: 45,
        backgroundColor: 'white',
        justifyContent: 'center',
        marginTop: 30,
        opacity: 0.75
      },
      btnAbout: {
        width: WIDTH -55,
        height: 45,
        borderRadius: 45,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        marginTop: 30,
        opacity: 0.75
      },
});