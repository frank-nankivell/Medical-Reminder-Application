import React, {Component} from 'react';
import Header from '../../components/Header';
import { LinearGradient } from 'expo';
import color from '../../constants/colors';
import InputMedication from '../../components/InputMedication';
import InputText from '../../components/InputText';

import {
    ScrollView,
    Text,
    View,
    StyleSheet } from 'react-native';
const headerTitle = 'Medication Reminder';

class Medication extends Component {
    constructor() {
        super()

    this.state = {
        inputValue: ''
    };
};
    newInputValue = value => {
        this.setState({
          inputValue: value,
          inputDosage: value
        });
      };

    render() {
        const { inputValue, inputDosage } = this.state;
        return (
            <LinearGradient
            colors={[color.tintColor, 'white']}
            style={styles.container}>
            <View style={styles.centered}>
              <Header title={headerTitle} />
            </View>
            <View style={styles.inputContainer}>
              <InputText inputValue={inputValue} onChangeText={this.newInputValue} />
              <InputMedication inputValue={inputDosage} onChangeText={this.newInputValue} />
            </View>
          </LinearGradient>
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
});
export default Medication