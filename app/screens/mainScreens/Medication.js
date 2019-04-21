import React, {Component} from 'react';
import Header from '../../components/Header';
import { LinearGradient } from 'expo';
import color from '../../constants/colors';
import lightWhite from '../../constants/colors';
import List from '../../components/List';
import ButtonNew from '../../components/Button';
import InputMedication from '../../components/InputMedication';
import DatePicker from 'react-native-datepicker'
import uuid from 'uuid/v1';
import itemListText from '../../constants/colors';
import colors from '../../constants/colors';
import InputDate from '../../components/InputDate'
import { Calendar, 
        CalendarList, 
        Agenda } from 'react-native-calendars'
import InputText from '../../components/InputText';
import bgImage from '../../images/background1.jpg';
import {
    Button,
    DatePickerIOS,
    ScrollView,
    Dimensions,
    Text,
    View,
    TextInput,
    Alert,
    Picker,
    TouchableOpacity,
    ActivityIndicator,
    AsyncStorage,
    ImageBackground,
    StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';



const headerTitle = 'New Medication Reminder';

const  { width: WIDTH} = Dimensions.get('window');


class Medication extends Component {
    constructor() {
        super()
        this.state = {
            allItems: {},
            inputValue: '',
            inputDosage: '',
            inputPerDay: '',
            inputInterval:'',
            inputNotes: '',
            inputEndDate: '',
            currentDate: this.getCurrentDate(),
            created: '',
            validateScreen: false,
            reminderScreen: false,
            thanks: false,
            loadingItems: false,
            isCompleted: false

        };
    };
      _onChangedDosage(value) {
      this.setState({
        inputDosage: value.replace(/[^0-9]/g, ''),
      });
    }

    _onChangedPerDay(value) {
      this.setState({
        inputPerDay: value.replace(/[^0-9]/g, ''),
      });
    }
    getCurrentDate = () => {
      var dateObj = new Date();
      var month = dateObj.getUTCMonth() + 1;
      var day = dateObj.getUTCDate();
      var year = dateObj.getUTCFullYear();
      newdate = year + "-" + month + "-" + day;
        return newdate;
    };
  
      loadingItems = async () => {
        try {
          const allItems = await AsyncStorage.getItem('Medication');
          this.setState({
            loadingItems: true,
            allItems: JSON.parse(allItems) || {}
          });
        } catch (err) {
          console.log(err);
        }
      };

      _onValidateScreen = () => {
        const { inputValue, inputDosage, inputPerDay, inputInterval, inputNotes, inputEndDate} = this.state;
        if (inputValue == '' || inputDosage == '' || inputPerDay == '' ||inputInterval=='' || inputNotes==''|| inputEndDate == '') {
          Alert.alert('Please complete all the values for the reminder')
      } else {
        this.setState({
          validateScreen: true,

        })
      }
    };

    _createReminder = () => {
      this.setState({
        reminderScreen: true
      });
    }


      _onCancel = () => {
        this.setState({
          validateScreen: false,
        })
      };
    

      _onDoneAddItem = () => {

        const { inputValue, inputDosage, inputPerDay, inputInterval, inputNotes, inputEndDate} = this.state;
        if (inputValue == '' || inputDosage == '' || inputPerDay == '' ||inputInterval=='' || inputNotes==''|| inputEndDate == '') {
            Alert.alert('Error values not complete')
        } else {
                this.setState(prevState => {
                  const id = uuid();
                  const newItemObject = {
                    [id]: {
                      id,
                      submit: false,
                      isCompleted: false,
                      value: inputValue,
                      dosage: inputDosage,
                      perDay: inputPerDay,
                      interval: inputInterval,
                      notes: inputNotes,
                      endDate: inputEndDate,
                      createdAt: this.state.currentDate,
                    }
                  };
                  console.log(newItemObject);

                  const newState = {
                    ...prevState,
                    inputValue: '',
                    inputDosage: '',
                    inputPerDay: '',
                    inputInterval: '',
                    inputNotes: '',
                    inputEndDate: '',
                    validateScreen: false, 
                    reminderScreen: false,
                    allItems: {
                      ...prevState.allItems,
                      ...newItemObject
                    }
                  };
                  this.saveItems(newState.allItems);
                 // this.props.navigation.navigate('Home');
                  return { ...newState };
 
                
                });
              }
            };


      saveItems = newItem => {
        const saveItem = AsyncStorage.setItem('MedicationReminder', JSON.stringify(newItem));
      };

    render() {
      if (this.state.validateScreen == false) {
        return (
            <ImageBackground source={bgImage} style={styles.backgroundContainer}>
            
            <View style={styles.centered}>
              <Header title={headerTitle} />
            </View>

            <View style={styles.centered} color='white'>
              <Text> Below enter your medication dosage and end date to create a reminder </Text>
            </View>

            <View style={styles.inputContainer}>
                  <TextInput // input Name 
                    style={styles.input}
                    placeholder='Name of pill'
                    onChangeText={(value) => this.setState({inputValue: value})}
                    value={this.state.inputValue}
                    maxLength={30}  //setting limit of input
                  />

                  <TextInput // input dosage 
                    style={styles.input}
                    placeholder='Pills per time'
                    keyboardType='numeric'
                    onChangeText={(value) => this._onChangedDosage(value)}
                    value={this.state.inputDosage}
                    maxLength={10}  //setting limit of input
                  />

                  <TextInput // input Per day 
                    style={styles.input}
                    keyboardType='numeric'
                    placeholder='Pills per day'
                    onChangeText={(value) => this._onChangedPerDay(value)}
                    value={this.state.inputPerDay}
                    maxLength={10}  //setting limit of input
                  />
              
                  <TextInput // input times per day  
                    style={styles.input}
                    placeholder='Enter Interval between doses'
                    keyboardType='numeric'
                    onChangeText={(value) => this.setState({inputInterval: value})}
                    value={this.state.inputInterval}
                    maxLength={10}  //setting limit of input
                  />
               
                <DatePicker // input end date 
                    style={styles.inputDate}
                    date={this.state.inputEndDate}
                    mode="date"
                    placeholder="select end date"
                    format="YYYY-MM-DD"
                    minDate={this.state.currentDate}
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                      dateInput: {
                        color: 'black',
                        fontSize: 30,
                        marginHorizontal: 25,
                        width: WIDTH -55,
                        height:40,
                        borderRadius: 45,
                        backgroundColor: 'white',
                        justifyContent: 'center',
                        marginTop: 10,
                        marginBottom: 10,
                        opacity: 0.75
                      }
                      // ... You can check the source to find the other keys.
                    }}
                    onDateChange={(date) => {this.setState({inputEndDate: date})}}
                  />
                  <TextInput // input Notes
                    style={styles.input}
                    placeholder='Enter Notes'
                    onChangeText={(value) => this.setState({inputNotes: value})}
                    value={this.state.inputNotes}
                    maxLength={50}  //setting limit of input
                  />
                  </View>
                <TouchableOpacity style={styles.btnSubmit}>
                
                <Button 
                  title="Submit" 
                  color="white" 
                  onPress={this._onValidateScreen}>
                </Button>
                </TouchableOpacity>
  
              
            </ImageBackground>
  
        );
    } else {
      return (
        <ScrollView>
        <View style={styles.validateScreen} >
        <TouchableOpacity style={styles.btnSubmit}>
          <Button 
              title="Confirm Medication Reminder" 
              color="black" 
              onPress={this._onDoneAddItem}>
            </Button>
            </TouchableOpacity>
        </View>
        <View>
        <TouchableOpacity style={styles.btnCancel}>
          <Button 
              title="Cancel" 
              color="black" 
              onPress={this._onCancel}>
            </Button>
            </TouchableOpacity>
        </View>
        </ScrollView>


      )
  }
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
        centered: {
            alignItems: 'center'
        },
        container: {
            flex: 1
        },
        scrollableList: {
          marginTop: 15
        },
        list: {
          flex: 1,
          marginTop: 70,
          paddingLeft: 15,
          marginBottom: 10
        },
        backgroundContainer: {
            flex: 1,
            width: null, 
            height: null,
            alignItems: 'center'
          },
          column: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
          },
          deleteAllButton: {
            marginRight: 40
          },
          inputContainer: {
            flex: 1, 
            width: WIDTH -35,
            borderRadius: 55,
            alignItems: 'center',
            backgroundColor:'white',
          },
          input: {
            borderBottomColor: 'rgba(0,0,0,0.5)',
            paddingLeft:25,
            flex: 0.3,
            fontSize: 25,
            width: WIDTH -55,
            borderRadius: 55,
            alignItems: 'center',
            borderColor: 'rgba(0,0,0,0.5)',
            backgroundColor: 'white',
            borderBottomWidth: 1,
            color: colors.green1,
            fontWeight: '500',
            fontSize: 16,
          },
          inputDate: {
            flex: 0.15,
            width: WIDTH -55,
            borderRadius: 55,
            borderBottomWidth: 0
          },

          btnSubmit: {
            marginHorizontal: 25,
            width: WIDTH -55,
            height:40,
            borderRadius: 45,
            backgroundColor: 'rgba(0,0,0,0.5)',
            justifyContent: 'center',
            marginTop: 15,
            marginBottom: 15,
            opacity: 0.75
          },
          btnCancel: {
            marginHorizontal: 25,
            width: WIDTH -55,
            height:40,
            borderRadius: 45,
            backgroundColor: colors.green1,
            justifyContent: 'center',
            marginTop: 15,
            marginBottom: 15,
            opacity: 0.75
          },
            validateScreen: {
              marginTop: 250,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between'
            }
});
export default Medication