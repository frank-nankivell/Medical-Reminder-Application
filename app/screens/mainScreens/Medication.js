import React, {Component} from 'react';
import Header from '../../components/Header';
import { LinearGradient } from 'expo';
import color from '../../constants/colors';
import lightWhite from '../../constants/colors';
import List from '../../components/List';
import ButtonNew from '../../components/Button';
import InputMedication from '../../components/InputMedication';
import uuid from 'uuid/v1';
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
        year: '',
        month: '',
        day: '',
        date: '',
       chosenDate: new Date(),
       loadingItems: false,
       isCompleted: false

    };
        this.setDate = this.setDate.bind(this);
        componentDidMount = () => {
          this.loadingItems();
        };
    };
    newInputValue = value => {
        this.setState({
          inputValue: value,
        });
      };

      newInputDosage = value => {
        this.setState({
          inputDosage: value
        });
      };

      newMonth = value => {
        this.setState({
          month: value
        });
      };
      newDay = value => {
        this.setState({
          day: value
        });
      };

      setDate = newDate => {
        this.setState({chosenDate: newDate});
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
        const { inputValue, inputDosage, loadingItems, day, month } = this.state; 
        return (
            <ImageBackground source={bgImage} style={styles.backgroundContainer}>
            <View style={styles.centered}>
              <Header title={headerTitle} />
            </View>
            <View>
              <Text> Below enter your medication dosage and end date to create a reminder </Text>
            </View>
            <View style={styles.inputContainer}>
              <InputText 
                inputValue={inputValue} 
                onChangeText={this.newInputValue} />

              <Picker 
                selectedValue={this.state.inputDosageNumber}
                onValueChange={(itemValue, itemIndex) => this.setState({inputDosageNumber: itemValue})}>     
    
                <Picker.Item label="1" value ='1' />
                <Picker.Item label="2" value ='2' />
                <Picker.Item label="3" value ='3' />
                <Picker.Item label="4" value ='4' />
                <Picker.Item label="5" value ='5' />
                <Picker.Item label="6" value ='6' />
                <Picker.Item label="7" value ='7' />
                <Picker.Item label="8" value ='8' />
                <Picker.Item label="9" value ='9' />
                <Picker.Item label="10" value ='10' />
                <Picker.Item label="11" value ='11' />
                <Picker.Item label="12" value ='12' />
                <Picker.Item label="13" value ='13' />

              </Picker>
              <Text> times per week</Text>
              <Picker
                label = 'days per week'
                selectedValue={this.state.inputDosageType}
                onValueChange={(itemValue, itemIndex) => this.setState({inputDosage: itemValue})}>     
    
                <Picker.Item label="per week" value ='week' />
                <Picker.Item label="per day" value ='day' />

              </Picker>
              <Text> date the medication will finish</Text>
              <DatePickerIOS
                style={styles.dateStyle}
                date={this.state.chosenDate}
                onDateChange={this.setDate}
                />

                <TouchableOpacity style={styles.btnSubmit}>
                <Button 
                  title="Submit" 
                  color="white" 
                  onPress={this.onDoneAddItem}>
                </Button>
                </TouchableOpacity>
            </View>

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
        inputContainer: {
            marginTop: 40,
            paddingLeft: 15
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
            marginTop: 70,
            paddingLeft: 15,
            justifyContent: 'space-between',
          },
          dateStyle: {
            width: WIDTH -55,
            height: 100,
            borderRadius: 45,
            fontSize: 30,
            backgroundColor: 'rgba(255,255,255,0.7)',
            justifyContent: 'center',
            marginTop: 30,
            opacity: 1
          },
          btnSubmit: {
            width: WIDTH -55,
            height: 45,
            borderRadius: 45,
            backgroundColor: '#4EEEFF',
            justifyContent: 'center',
            marginTop: 30,
            opacity: 0.75
          },
});
export default Medication