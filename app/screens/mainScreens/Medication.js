import React, {Component} from 'react';
import Header from '../../components/Header';
import { LinearGradient } from 'expo';
import color from '../../constants/colors';
import InputMedication from '../../components/InputMedication';
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
       chosenDate: new Date()
    };
        this.setDate = this.setDate.bind(this);
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

    render() {
        const { inputValue, inputDosage, day, month } = this.state; 
        return (
            <ImageBackground source={bgImage} style={styles.backgroundContainer}>
            <View style={styles.centered}>
              <Header title={headerTitle} />
            </View>
            <View style={styles.inputContainer}>
              <InputText inputValue={inputValue} onChangeText={this.newInputValue} />
              <InputMedication inputDosage={inputDosage} onChangeText={this.newInputDosage} />
            </View>
            <View style={styles.container}>
                <DatePickerIOS
                date={this.state.chosenDate}
                onDateChange={this.setDate}
                />
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
        backgroundContainer: {
            flex: 1,
            width: null, 
            height: null,
            alignItems: 'center'
          }
});
export default Medication