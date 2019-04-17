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
    Alert.alert('This is an application for managing your medicine. In an emergency you can use our healthcare finder, otherwise login to update your medicine dosage and check if you are on track with your dosage!')
  }


    render() {

            return (
              <View style ={styles.backgroundContainer}>
      
                <TouchableOpacity style={styles.btnTest}>
                    <Button
                    raised
                    style ={styles.logo}
                    title = "Find your local healthcare centre"
                    color="#BA55D3"
                    onPress={this._orderTest.bind(this)}
                    />
               </TouchableOpacity>
               <TouchableOpacity style={styles.btnLogin}>
                    <Button
                    raised
                    style ={styles.buttonStyler}
                    title = "Login to see access your dosage"
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
        backgroundColor: '#00B7EB'
      },
      text: 
        {
      fontSize: 50,
      color: '#00B7EB',
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
