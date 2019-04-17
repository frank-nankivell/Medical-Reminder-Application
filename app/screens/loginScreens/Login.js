import React from 'react';
import { FontAwesome } from '@expo/vector-icons';
import thirdcolor from '../../constants/colors'
import Icon from 'react-native-vector-icons/Ionicons'
import floatingBackButton from '../../components/floatingBackButton';
import { StyleSheet, 
          Text,
          TextInput,
          Image,
          Button,
          View, 
          ImageBackground,
          TouchableOpacity,
          AsyncStorage,
          Dimensions
        } from 'react-native';

// import UserForm from './components/UserForm';

import bgImage from '../../images/background2.jpg';

const  { width: WIDTH} = Dimensions.get('window');

export default class Login extends React.Component {
  constructor() {
    super()
    this.state = {
      showPass: true,
      press: false, 
      back: false,

    }
  }

  // Method to present password to user when selecting ico
  showPass = () => {
    if (this.state.press == false) {
    this.setState({showPass: false, press: true})
  } else {
    this.setState({ showPass: true, press: false})
    }
  }

  // Method to set token and login
  _signInAsync = async () => {
    await AsyncStorage.setItem('userToken', 'abc');
    this.props.navigation.navigate('Main');
  };

  _backButton  = () => {
  if (this.state.back == true) {
    this.props.navigation.navigate('Auth');
  }
};

  
  render() {
    return (
      <ImageBackground source={bgImage} style={styles.backgroundContainer}>

        <View style ={styles.logoContainer}>
          <Text style={styles.logoText}> Medical reminder app </Text>
          <Text style={styles.standardText}> Login to update and add to your reminders!  </Text>
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
                secureTextEntry={this.state.showPass}
                placeholderTextColor={'rgba(255,255,255,0.7)'}
                underLineColorAndroid='transparent'
              />

              <TouchableOpacity style={styles.btnEye}
                onPress={this.showPass.bind(this)}>
                <Icon name={this.state.press == false ? 'ios-eye' : 'ios-eye-off'} 
                    size={26} color={'rgba(255,255,255,0.7)'}
                />
              </TouchableOpacity>
             </View>
             <TouchableOpacity style={styles.btnLogin}>
                <Button title="Login" color="white" onPress={this._signInAsync.bind(this)}>
                </Button>
              </TouchableOpacity>

      </ImageBackground>
    )
  }
};
const styles = StyleSheet.create({
  btnBack: {
    alignSelf: 'flex-end',
    position: 'absolute',
    bottom: 35,
    left:0,
  },
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
    alignItems: 'center',
    marginBottom: 50
  },
  logo: {
    width: 120,
    height: 120,
  },
  logoText: {
    color: 'white', 
    fontSize: 30,
    fontWeight: '600',
    marginTop: 10,
    opacity: 2
  },
  standardText: {
    color: 'rgba(0,0,0,0.5)', 
    fontSize: 20,
    fontWeight: '500',
    marginTop: 15,
    opacity: 2
  },
  inputContainer: {
    marginTop: 50,
    marginBottom: 10
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
  inputIcon: {
    position: 'absolute',
    top: 10,
    left: 37
  },
  btnEye: {
    position: 'absolute',
    top: 10,
    left: 337
  },
  btnLogin: {
    width: WIDTH -55,
    height: 45,
    borderRadius: 45,
    backgroundColor: '#4EEEFF',
    justifyContent: 'center',
    marginTop: 30,
    opacity: 0.75
  },
  text: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  }
});