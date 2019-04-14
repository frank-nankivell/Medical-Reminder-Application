import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/Ionicons'
import colors from '../../constants/colors';
import {
    ScrollView,
    Text,
    View,
    Button,
    Dimensions,
    Alert,
    ListView,
    AsyncStorage,
    TouchableOpacity,
    StyleSheet } from 'react-native';

import logo from '../../images/dna-purple.png';
import bgImage from '../../images/background.jpg';
import t from 'tcomb-form-native';
import createIconSetFromFontello from '@expo/vector-icons/createIconSetFromFontello';

const parseString = require('react-native-xml2js').parseString;

const  { width: WIDTH} = Dimensions.get('window');
const Form = t.form.Form;

const NHSToken = 'd8228b0eebb443a7958c046e7a4be38f';

const User = t.struct({
    firstName: t.String,
    secondName: t.String,
    email: t.String,
    password: t.String,
    password2: t.String,
    postCode: t.String,
    terms: t.Boolean,
  });

const formStyles = {
    ...Form.stylesheet,
    formGroup: {
      normal: {
        marginBottom: 10,
      },
    },
    controlLabel: {
      normal: {
        color: colors.textColor,
        fontSize: 25,
        marginBottom: 10,
        paddingLeft: 5,
        fontWeight: '600',
      },
      // the style applied when a validation error occours
      error: {
        color: 'rgba(255,255,255,0.7)',
        fontSize: 18,
        marginBottom: 7,
        fontWeight: '600',
      },
    },
  };

const options = {
    fields: {
        firstName: {
            error:
            'Please enter your first name',
        },
        secondName: {
            error:
            'Please enter your second name',
        },
      email: {
        error:
          'Without an email address how are you going to reset your password when you forget it?',
      },
      password: {
        error:
          "Choose something you use on a dozen other sites or something you won't remember",
      },
      password2: {
          label: "Re Enter Password",
            error:
          "Please re enter your password"
      },
      postCode: {
        error:
          "Please enter your post code"
      },

      terms: {
        label: 'Agree to Terms'
      },

    },
    stylesheet: formStyles,
  };

  

class OrderHome extends Component {
    
    constructor() {
        super()
        this.state = {
            press: false,
            callMade: false,
            datasource: null

         }
    }
    
    handleSubmit = () => {
        console.log(bearer)
        var value = this._form.getValue();
        var bearer = 'Bearer' + NHSToken;
        var url = 'https://api.nhs.uk/data/services/';
        var serviceCode = 'srv0046/' // 'srv0118'
        var pcode = 'postcode/' + value.postCode;
        var distance = '/?distance=10'; // can amend distance variable
        const fullUrl = url + serviceCode + pcode + distance;


        console.log('value: ', value);
        console.log(bearer)
        console.log('nhs' + NHSToken)

        fetch(fullUrl, {
            method: 'GET',
            withCredentials: true,
            credentials: 'include',
            headers: {
                'subscription-key': NHSToken,
                'Authorization': bearer,
                'Host': 'api.nhs.uk',
                'X-FP-API-KEY': 'iphone', //it can be iPhone or your any other attribute
                'Content-Type': 'application/x'
            }
    
        })
        .then(response => response.text())
        .then( (responseText) => {
          var data;
            parseString(responseText, function (err, result) {
                data = result;
                console.log('xml',data)
            });
            
            this.setState({
                callMade: true, 
                dataSource: data,
            })
        }).catch((err) => {
            console.log('fetch', err)
        });
    };
    

// method to render values from 

    _onPressQuestion() {
        Alert.alert('Full terms and conditions available on our website and www.com. Test ordering form will not provide full test but access to services where blood can be taken')
      };

    _backButton  = () => {
        if (this.state.back == true) {
            this.props.navigation.navigate('Auth');
        }
    };
    _dataScreen = () => 
    this.setState({
      callMade: false, 
  })
    




    // Render method 
    render() {
        if (this.state.callMade)  {
          return(

              <ScrollView> 
              <View style={styles.container}>
              <Text> The API results go here
                {dataSource.$}
              </Text>
              </View>
              <ListView dataSource={this.state.names} renderRow={this.renderRow.bind(this)} />


              <View style={styles.container}>
              <Text> The API results go here
                {details}
              </Text>
              </View>

            <View>
            <TouchableOpacity style={styles.btnSignUp}>
              <Button
                raised
                style ={styles.buttonStyler}
                title = "go back!"
                color="black"
                onPress={this._dataScreen}
                />
              </TouchableOpacity>
              </View>
               </ScrollView>
            )

        }  else {
    return (
        <ScrollView style ={styles.backDrop}>
            <View style={styles.titleContent}>
              <Text> Sign up to order a test</Text> 
          </View>

        <View style={styles.signUpContainer}>
            <Form ref={c => (this._form = c)} type={User} options={options} />
            <Icon name = { 'ios-help-circle-outline'} onPress={this._onPressQuestion}
            size={30} color={'rgba(0,0,0,0.5)'}
            style={styles.inputIcon}/>
            <TouchableOpacity style={styles.btnSignUp}>
                <Button
                raised
                style ={styles.buttonStyler}
                title = "Sign Up!"
                color="white"
                onPress={this.handleSubmit}
                />
                </TouchableOpacity>
        </View>

        </ScrollView>

        );
    };

    }
};


const styles = StyleSheet.create ({
    text: 
        {
            fontSize: 50,
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
      signUpContainer: {
        marginBottom: 5,
        marginTop: 10,
        width: WIDTH -25,
        justifyContent: 'space-evenly',
      },
      backgroundContainer: {
        flex: 1,
        width: null, 
        height: null,
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.5,
      },
      titleContent: {
          marginTop: 10,
      },
      inputIcon: {
        position: 'absolute',
        top: 585,
        left: 60
      },
      backDrop: {
        backgroundColor:'rgba(255,255,255,0.7)',
        borderBottomColor: 'grey'
      },
      btnSignUp: {
        width: WIDTH -55,
        alignItems: 'center',
        height: 45,
        borderRadius: 45,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        marginTop: 30,
        opacity: 0.75
      },
      buttonStyler:
      {
          backgroundColor: 'pink',
          marginTop: 50,
          marginBottom: 10,
          justifyContent: 'center',
          alignItems: 'center'

      },


});
export default OrderHome;