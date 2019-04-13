import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/Ionicons'
import {
    ScrollView,
    Text,
    View,
    Image,
    StatusBar,
    Button,
    ImageBackground,
    TouchableOpacity,
    AsyncStorage,
    Dimensions,
    StyleSheet } from 'react-native';

import logo from '../../images/dna-purple.png';
const  { width: WIDTH} = Dimensions.get('window');

class OrderHome extends Component {
    constructor() {
        super()
        this.state = {
            postcode: false,
            option: false,
            help: false,
            back: false,
            cancer: false,
            raredisease: false,
            healthy: false, 
            }
    }


//_nhsLocations = () => {
//    if (postcode == true && (cancer == true || raredisease || true || healthy == true)


_backButton  = () => {
    if (this.state.back == true) {
        this.props.navigation.navigate('Auth');
    }
};
    render() {

    return (
        <ScrollView>

        <View style ={styles.buttonComponent}>
        <Text> style = {styles.text}
        <Button
            raised
            icon={{name: 'cached'}}
            title='A RARE DISEASE'
            color = 'rgba(0,0,0,0.5)'
            backgroundColor = '#BA55D3'
            onPress={() => this.state.raredisease}  />
        </Text>

        <Button
        raised
        icon={{name: 'cached'}}
        title='A FORM OF CANCER'
        color = 'rgba(0,0,0,0.5)'
        buttonStyle={styles.button}
        onPress={() => this.state.cancer} />

        <Button
        raised
        icon={{name: 'cached'}}
        title='HEALTHY PERSON'
        color = 'rgba(0,0,0,0.5)'
        onPress={() => this.state.healthy} />
       
        </View>

        <View style ={styles.signInContainer}>
            <Button title="I have already submitted a test" onPress={() => this.props.navigation.navigate('Auth')}/>
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
            marginTop: 300,
            backgroundColor: '#BA55D3'
        },
    buttonComponent:
        {
            marginTop: 50,
            marginBottom: 10
        },
    button: {
        marginBottom: 30,
        width: WIDTH -55,
        height: 45,
        borderRadius: 45,
        fontSize: 16,
        paddingLeft: 45,
        backgroundColor: 'rgba(0,0,0,0.5)',
        marginHorizontal: 25
        },
    logo:
    {
        marginTop: 40,
        marginBottom: 10
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 50
      },
      signInContainer: {
        alignItems: 'center',
        marginBottom: 5,
        marginTop: 550,
      },


});
export default OrderHome;