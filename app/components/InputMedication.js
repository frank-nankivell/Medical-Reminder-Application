import React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { thirdColor } from '../constants/colors';
const InputMedication = ({ inputDosage, onChangeDosage, onDoneAddDosage, }) => (
  <TextInput
    style={styles.input}
    inputDosage={inputDosage}
    onChangeDosage={onChangeDosage}
    placeholder='enter dosage'
    placeholderTextColor={thirdColor}
    multiline={true}
    autoCapitalize="sentences"
    underlineColorAndroid="transparent"
    selectionColor={'white'}
    maxLength={30}
    returnKeyType="done"
    autoCorrect={false}
    blurOnSubmit={true}
    onSubmitEditing={onDoneAddDosage}
  />
);
const styles = StyleSheet.create({
  input: {
    paddingTop: 10,
    paddingRight: 15,
    fontSize: 34,
    color: '#68E7FA',
    fontWeight: '500'
  }
});
export default InputMedication;