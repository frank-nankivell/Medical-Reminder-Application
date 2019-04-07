import React from 'react';
import { FontAwesome } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/Ionicons'
import { StyleSheet, 
          Text,
          TextInput,
          Image,
          View, 
          ImageBackground,
          Dimensions
        } from 'react-native';
import UserForm from './components/UserForm';
import bgImage from './images/background.jpg'
import logo from './images/dna-purple.png'

const AccessPassword = process.env.PASSWORD;
const AccessUsername = process.env.USERNAME;
const AccessToken = process.env.TOKEN;


const  { width: WIDTH} = Dimensions.get('window');

export default class App extends React.Component {
  render() {
    return (
      <ImageBackground source={bgImage} style={styles.backgroundContainer}> 
        <View style ={styles.logoContainer}>
          <Image source={logo} style ={styles.logo}/>
          <Text style={styles.logoText}> Participant App </Text>
          <Text style={styles.standardText}> find out about your genomic results </Text>
        </View>

        <View style ={styles.inputContainer}>
          <Icon name = {'ios-person'} size={28} color={'rgba(255,255,255,0.7)'}
            style={styles.inputIcon}/>
            <TextInput
              style={styles.input}
              placeholder={'Username'}
              placeholderTextColor={'rgba(255,255,255,0.7)'}
              underLineColorAndroid='transparent'
              />
            </View>

            <View>
            <Icon name = {'ios-lock'} size={28} color={'rgba(255,255,255,0.7)'}
              style={styles.inputIcon}/>
            <TextInput
                style={styles.input}
                placeholder={'Password'}
                secureTextEntry={true}
                placeholderTextColor={'rgba(255,255,255,0.7)'}
                underLineColorAndroid='transparent'
              />
             </View>
      </ImageBackground>
    )
  }
};
const styles = StyleSheet.create({
  item: {
    flex: 1,
    alignSelf: 'stretch',
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 20,
    borderBottomColor: '#eee'
  },
  backgroundContainer: {
    flex: 1,
    width: null, 
    height: null,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logoContainer: {
    alignItems: 'center'
  },
  logo: {
    width: 120,
    height: 120,
  },
  logoText: {
    color: '#BA55D3', 
    fontSize: 30,
    fontWeight: '600',
    marginTop: 10,
    opacity: 2
  },
  standardText: {
    color: '#BA55D3', 
    fontSize: 15,
    fontWeight: '700',
    marginTop: 15,
    opacity: 2
  },
  input: {
    width: WIDTH -55,
    height: 45,
    borderRadius: 45,
    fontSize: 16,
    paddingLeft: 45,
    backgroundColor: 'rgba(0,0,0,0.5)',
    color: 'white',
    marginHorizontal: 25
  },
  inputIcon :{
    position: 'absolute',
    top: 10,
    left: 37,
  }
});
