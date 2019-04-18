import React, {Component} from 'react';
import Header from '../../components/Header';
import { LinearGradient } from 'expo';
import color from '../../constants/colors';
import lightWhite from '../../constants/colors';
import List from '../../components/List';
import Button from '../../components/Button';
import InputMedication from '../../components/InputMedication';
import uuid from 'uuid/v1';
import InputDate from '../../components/InputDate'
import { Calendar, CalendarList, Agenda } from 'react-native-calendars'
const currentDate = new Date().getDate();

import InputText from '../../components/InputText';
import bgImage from '../../images/background1.jpg';
import {
    DatePickerIOS,
    ScrollView,
    Text,
    View,
    ActivityIndicator,
    AsyncStorage,
    ImageBackground,
    StyleSheet } from 'react-native';
const headerTitle = 'Medication Reminder';

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
            <View style={styles.inputContainer}>
              <InputText 
                inputValue={inputValue} 
                onChangeText={this.newInputValue} 
                onDoneAddItem={this.onDoneAddItem}/>

              <InputMedication 
                inputDosage={inputDosage} 
                onChangeText={this.newInputDosage}
                onDoneAddItem={this.onDoneAddItem}/>

              <DatePickerIOS
                date={this.state.chosenDate}
                onDateChange={this.setDate}
                />
            </View>
    

        <View style={styles.list}>
          <View style={styles.column}>
            <View style={styles.deleteAllButton}>
              <Button deleteAllItems={this.deleteAllItems} />
            </View>
          </View>
          {loadingItems ? (
            <ScrollView contentContainerStyle={styles.scrollableList}>
              {Object.values(allItems)
                .reverse()
                .map(item => (
                  <List
                    key={item.id}
                    {...item}
                    deleteItem={this.deleteItem}
                    completeItem={this.completeItem}
                    incompleteItem={this.incompleteItem}
                  />
                ))}
            </ScrollView>
          ) : (
            <ActivityIndicator size="large" color="white" />
          )}
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
          }
});
export default Medication