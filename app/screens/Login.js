import React from 'react';
import { FontAwesome } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/Ionicons'
import { StyleSheet, 
          Text,
          TextInput,
          Image,
          View, 
          ImageBackground,
          TouchableOpacity,
          Dimensions
        } from 'react-native';

// import UserForm from './components/UserForm';
import bgImage from '../images/background.jpg'
import logo from '../images/dna-purple.png'


const  { width: WIDTH} = Dimensions.get('window');

export default class Login extends React.Component {

    state = {
        username: '',
        password: '',
        isLoggingIn: false,
        message: '',
        showPass: true,
        press: false
    }


    _userLogin = () => {

        this.setState({ isLoggingIn: true, message: '' });

        var params = {
            username: this.state.username,
            password: this.state.password,
            grant_type: 'password'
        };

        var formBody = [];
        for (var property in params) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(params[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        var proceed = false;
        fetch("https://"+Environment.CLIENT_API+"/oauth/token", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: formBody
            })
            .then((response) => response.json())
            .then((response) => {
                if (response.status==200) proceed = true;
                else this.setState({ message: response.message });
            })
            .then(() => {
                this.setState({ isLoggingIn: false })
                if (proceed) this.props.onLoginPress();
            })
            .catch(err => {
				this.setState({ message: err.message });
				this.setState({ isLoggingIn: false })
			});
    }

    clearUsername = () => {
        this._username.setNativeProps({ text: '' });
        this.setState({ message: '' });
    }

    clearPassword = () => {
        this._password.setNativeProps({ text: '' });
        this.setState({ message: '' });
    }
    
  render() {
    return (
      <ImageBackground source={bgImage} style={styles.backgroundContainer}> 
        <View style ={styles.logoContainer}>
          <Image source={logo} style ={styles.logo}/>
          <Text style={styles.logoText}> Participant App </Text>
          <Text style={styles.standardText}> find out about your genomic results  </Text>
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
                <Text style={styles.text}>Login</Text>
              </TouchableOpacity>
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
    alignItems: 'center',
    marginBottom: 50
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
    color: 'black', 
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
    backgroundColor: '#BA55D3',
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
