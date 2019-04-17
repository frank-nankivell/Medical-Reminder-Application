import React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { inputPlaceholder } from '../constants/colors';
const InputText = ({ inputValue, onChangeText, onDoneAddItem}) => (
  <TextInput
    style={styles.input}
    inputValue={inputValue}
    onChangeText={onChangeText}
    placeholder='enter medication'
    placeholderTextColor={inputPlaceholder}
    multiline={true}
    autoCapitalize="sentences"
    underlineColorAndroid="transparent"
    selectionColor={'white'}
    maxLength={30}
    returnKeyType="done"
    autoCorrect={false}
    blurOnSubmit={true}
    onSubmitEditing={onDoneAddItem}
  />
);
const styles = StyleSheet.create({
  input: {
    paddingTop: 10,
    paddingRight: 15,
    fontSize: 34,
    color: '#4EEEFF',
    fontWeight: '500'
  }
});
export default InputText;