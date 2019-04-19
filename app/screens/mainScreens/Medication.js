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
import green1 from '../../constants/colors';
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
    Picker,
    TouchableOpacity,
    ActivityIndicator,
    AsyncStorage,
    ImageBackground,
    StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';



const headerTitle = 'Medication Reminder';
const currentDate = new Date().getDate();
const  { width: WIDTH} = Dimensions.get('window');


class Medication extends Component {
    constructor() {
        super()

    this.state = {
        inputValue: '',
        inputDosage: '',
        inputPerDay: '',
        inputInterval:'',
        inputNotes: '',
        inputEndDate: '',
        Created: new Date(),
        loadingItems: false,
        isCompleted: false

    };
};
  
    // Method for updating Value
    newInputValue = value => {
        this.setState({
          inputValue: value,
        });
      };
      // Method for updating Dosage
      newInputDosage = value => {
        this.setState({
          inputDosage: value
        });
      };
      // Method for updating per day 
      newInputPerDay  =  value => {
        this.setState({
          inputPerDay: value
        });
      };
      // Method for updating Interval 
      newInputInterval  =  value => {
        this.setState({
          inputInterval: value
        });
      };
    // Method for updating Notes
      newInputNotes  =  value => {
        this.setState({
          inputNotes: value
        });
      };
      // Method for updating End Date
      newInputEndDate  =  value => {
        this.setState({
          inputEndDate: value
        });
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
    

      onDoneAddItem = () => {
        const { inputValue } = this.state;
        if (inputValue !== '' || inputDosage !== '') {
          this.setState(prevState => {
            const id = uuid();
            const newItemObject = {
              [id]: {
                id,
                isCompleted: false,
                type: inputValue,
                dosage: inputDosage,
              //  endDate: date,
                createdAt: Date.now()
              }
            };
            const newState = {
              ...prevState,
              inputValue: '',
              allItems: {
                ...prevState.allItems,
                ...newItemObject
              }
            };
            this.saveItems(newState.allItems);
            return { ...newState };
          });
        }
      };
      deleteItem = id => {
        this.setState(prevState => {
          const allItems = prevState.allItems;
          delete allItems[id];
          const newState = {
            ...prevState,
            ...allItems
          };
          this.saveItems(newState.allItems);
          return { ...newState };
        });
      };

      completeItem = id => {
        this.setState(prevState => {
          const newState = {
            ...prevState,
            allItems: {
              ...prevState.allItems,
              [id]: {
                ...prevState.allItems[id],
                isCompleted: true
              }
            }
          };
          this.saveItems(newState.allItems);
          return { ...newState };
        });
      };
      incompleteItem = id => {
        this.setState(prevState => {
          const newState = {
            ...prevState,
            allItems: {
              ...prevState.allItems,
              [id]: {
                ...prevState.allItems[id],
                isCompleted: false
              }
            }
          };
          this.saveItems(newState.allItems);
          return { ...newState };
        });
      };

      deleteAllItems = async () => {
        try {
          await AsyncStorage.removeItem('Medication');
          this.setState({ allItems: {} });
        } catch (err) {
          console.log(err);
        }
      };

      saveItems = newItem => {
        const saveItem = AsyncStorage.setItem('Medication new', JSON.stringify(newItem));
      };

    render() {
        const { inputValue, inputDosage, inputPerDay, inputInterval, inputNotes, inputEndDate  } = this.state; 
        return (
            <ImageBackground source={bgImage} style={styles.backgroundContainer}>
            
            <View style={styles.centered}>
              <Header title={headerTitle} />
            </View>

            <View style={styles.centered} color='white'>
              <Text> Below enter your medication dosage and end date to create a reminder </Text>
            </View>

            <View style={styles.inputContainer}>
                <InputText // input Value
                    style={styles.input}
                    inputValue={inputValue} 
                    onChangeText={this.newInputValue} />

                  <TextInput // input dosage 
                    style={styles.input}
                    placeholder='Enter Dosage'
                    keyboardType='numeric'
                    onChangeText={(text)=> this.onChanged(text)}
                    value={this.state.inputDosage}
                    maxLength={10}  //setting limit of input
                  />

                  <TextInput // input Per day 
                    style={styles.input}
                    keyboardType='numeric'
                    placeholder='Enter Amount per day'
                    onChangeText={(text)=> this.onChanged(text)}
                    value={this.state.inputPerDay}
                    maxLength={10}  //setting limit of input
                  />
                  <DatePicker // input interval
                    style={styles.inputDate}
                    date={this.state.inputInterval}
                    mode="time"
                    placeholder="Select Interval Time"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                      dateInput: {
                        marginHorizontal: 25,
                        width: WIDTH -55,
                        height:40,
                        borderRadius: 45,
                        backgroundColor: '#6EC3CF',
                        justifyContent: 'center',
                        marginTop: 10,
                        marginBottom: 25,
                        opacity: 0.75
                      }
                      // ... You can check the source to find the other keys.
                    }}
                    onDateChange={(time) => {this.setState({inputInterval: time})}}
                    />
                  <TextInput // input times per day  
                    style={styles.input}
                    placeholder='Enter Times per Day'
                    keyboardType='numeric'
                    onChangeText={(text)=> this.onChanged(text)}
                    value={this.state.inputInterval}
                    maxLength={10}  //setting limit of input
                  />
               
                <DatePicker // input end date 
                    style={styles.inputDate}
                    date={this.state.inputEndDate}
                    mode="date"
                    placeholder="select end date"
                    format="YYYY-MM-DD"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                      dateInput: {
                        marginHorizontal: 25,
                        width: WIDTH -55,
                        height:40,
                        borderRadius: 45,
                        backgroundColor: '#6EC3CF',
                        justifyContent: 'center',
                        marginTop: 10,
                        marginBottom: 25,
                        opacity: 0.75
                      }
                      // ... You can check the source to find the other keys.
                    }}
                    onDateChange={(date) => {this.setState({inputEndDate: date})}}
                  />
                  <TextInput // input Notes
                    style={styles.input}
                    placeholder='Enter Notes'
                    onChangeText={(text)=> this.onChanged(text)}
                    value={this.state.inputNotes}
                    maxLength={10}  //setting limit of input
                  />
                  </View>
                <TouchableOpacity style={styles.btnSubmit}>
                
                <Button 
                  title="Submit" 
                  color="white" 
                  onPress={this.onDoneAddItem}>
                </Button>
                </TouchableOpacity>
  
              
            </ImageBackground>
  
        );
    }
}


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
            width: WIDTH -55,
            borderRadius: 55,
            alignItems: 'center',
            backgroundColor:'white',
          },
          input: {
            paddingLeft: 45,
            flex: 0.3,
            fontSize: 25,
            width: WIDTH -55,
            borderRadius: 55,
            alignItems: 'center',
            borderColor: 'rgba(0,0,0,0.5)',
            backgroundColor:  'white',
            color: 'white'
          },
          inputDate: {
            flex: 0.3,
            width: WIDTH -55,
            borderRadius: 55,
          },

          btnSubmit: {
            marginHorizontal: 25,
            width: WIDTH -55,
            height:40,
            borderRadius: 45,
            backgroundColor: 'rgba(0,0,0,0.5)',
            justifyContent: 'center',
            marginTop: 10,
            marginBottom: 25,
            opacity: 0.75
          },
});
export default Medication