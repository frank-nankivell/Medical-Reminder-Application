import React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { inputPlaceholder } from '../constants/colors';
const InputForm = ({ inputValue, onChangeText1, onDoneAddItem1, input1 }) => (
  <TextInput
    style={styles.input}
    inputValue={inputValue}
    onChangeText1={onChangeText1}
    placeholder={input1}
    placeholderTextColor={inputPlaceholder}
    multiline={true}
    autoCapitalize="sentences"
    underlineColorAndroid="transparent"
    selectionColor={'white'}
    maxLength={30}
    returnKeyType="done"
    autoCorrect={false}
    blurOnSubmit={true}
    onSubmitEditing={onDoneAddItem1}
  />
);
const styles = StyleSheet.create({
  input: {
    paddingTop: 10,
    paddingRight: 15,
    fontSize: 34,
    color: 'white',
    fontWeight: '500'
  }
});
export default InputForm;