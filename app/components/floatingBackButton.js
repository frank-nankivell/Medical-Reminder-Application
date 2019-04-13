import React from 'react';
import { withNavigation } from 'react-navigation';

import {View,
        Text,
        Icon,
        Button } from 'react-native';


class floatingBackButton extends React.Component {
  render() {
    return <Button title="Back" onPress={() => { this.props.navigation.goBack() }} />;
  }
}

// withNavigation returns a component that wraps MyBackButton and passes in the
// navigation prop
export default withNavigation(floatingBackButton);
