import React, {Component} from 'react';
import {
    ScrollView,
    Text,
    View,
    Image,
    StatusBar,
    Button,
    AsyncStorage,
    ImageBackground,
    StyleSheet } from 'react-native';

import logo from '../images/dna-purple.png';

class Home extends Component {
    constructor() {
        super()
        this.state = {

          loggedin: true,
          press: false
    
        }
      }
    render() {


    _signOutAsync = async () => {
        try {
            await AsyncStorage.removeItem('userToken');
            this.props.navigation.navigate('Auth');
          } catch (error) {
            // Error retrieving data
            console.log(error.message);
          }
        }

    return (
        <ScrollView>
        <Text style={styles.text}> Participant App </Text>


        <View style ={styles.logoContainer}>
            <Image source={logo} style ={styles.logo}/>
        </View>
        
        <View style ={styles.buttonStyler}>
            <Button title="sign me out" onPress={() => this.props.navigation.navigate('Auth')}/>
        </View>
        </ScrollView>
        );
    }
};
const styles = StyleSheet.create ({
    text: 
        {
            fontSize: 50, 
            fontWeight: 'bold',
            textAlign: 'center',
            marginTop: 300
        },
    buttonStyler:
        {
            marginTop: 50,
            marginBottom: 10
        },
    logo:
    {
        marginTop: 10,
        marginBottom: 10
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 50
      }


});
export default Home;