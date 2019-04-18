import React from 'react';
import { StyleSheet, TextInput, Dimensions } from 'react-native';
const  { width: WIDTH} = Dimensions.get('window');

import { inputPlaceholder, tintColor, lightWhite} from '../constants/colors';
const InputText = ({ inputValue, onChangeText, onDoneAddItem}) => (
  <TextInput
    style={styles.input}
    inputValue={inputValue}
    onChangeText={onChangeText}
    placeholder='Enter Medication'
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
    width: WIDTH -55,
    height: 45,
    borderRadius: 45,
    fontSize: 30,
    backgroundColor: 'rgba(255,255,255,0.7)',
    justifyContent: 'center',
    marginTop: 30,
    opacity: 0.75
}
});
export default InputText;