import React, {Component} from 'react';
import {
    ScrollView,
    Text,
    View,
    Button,
    Image,
    Alert,
    Dimensions,
    AsyncStorage,
    TouchableOpacity,
    StyleSheet } from 'react-native';

const  { width: WIDTH} = Dimensions.get('window');

export default class Splash extends Component {
    constructor() {
        super()
    }

    componentDidMount() {
      this.clearTokenCache();
    };

    clearTokenCache = async () => {
        try {
          await AsyncStorage.removeItem('Medication');
          await AsyncStorage.removeItem('userToken');
        } catch (err) {
          console.log(err);
        }
    };
    // Method to navigate to order form
  _orderTest = async () => {
    this.props.navigation.navigate('Location');
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
                    title = "Find your local Pharmacy"
                    color="rgba(0,0,0,0.5)"
                    onPress={this._orderTest.bind(this)}
                    />
               </TouchableOpacity>
               <TouchableOpacity style={styles.btnLogin}>
                    <Button
                    raised
                    style ={styles.buttonStyler}
                    title = "Login to see your Reminders"
                    color="rgba(0,0,0,0.5)"
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
        backgroundColor: '#6EC3CF'
      },
      text: 
        {
      fontSize: 50,
      color: 'rgba(0,0,0,0.5)',
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
