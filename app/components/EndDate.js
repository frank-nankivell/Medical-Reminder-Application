import React, {Component} from 'react';
import {DatePickerIOS, View, StyleSheet} from 'react-native';

class EndDate extends Component {
  setDate(newDate) {
    this.setState({chosenDate: newDate});
  };

  render() {
    return (
      <View style={styles.container}>
        <DatePickerIOS
          date={this.state.chosenDate}
          onDateChange={this.setDate}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default EndDate;