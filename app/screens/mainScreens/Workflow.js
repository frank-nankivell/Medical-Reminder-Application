import React, {Component} from 'react';
import Header from '../../components/Header';
import Input from '../../components/InputText';
import { LinearGradient } from 'expo';
import color from '../../constants/colors';

const input1  = 'drugs enter em'
import {
    ScrollView,
    Text,
    View,
    StyleSheet } from 'react-native';
const headerTitle = 'Medication Reminder';

class First extends Component {
    constructor() {
        super()

    this.state = {
        inputValue: '',
        input1: 'medication reminder'
    };
};
    newInputValue = value => {
        this.setState({
          inputValue: value
        });
      };

    render() {
        const { inputValue } = this.state;
        return (
            <LinearGradient
            colors={[color.tintColor, 'white']}
            style={styles.container}>
            <View style={styles.centered}>
              <Header title={headerTitle} />
            </View>
            <View style={styles.inputContainer}>
              <Input inputValue={inputValue} placeholder={input1} onChangeText={this.newInputValue} />
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
export default First;