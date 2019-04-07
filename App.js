import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true, 
      datasource: null,
    }
  }

  componentDidMount () {

    return fetch('https://facebook.github.io/react-native/movies.json')
      .then ( (response) => response.json() )
      .then( (responseJson) => {

        this.setState({
          isLoading: false, 
          dataSource: responseJson.movies,
        })

      })

      .catch((error) => {
        console.log(error)
      });

      // details for post via API auth 
      /*
      fetch('inserturl', {
        method: 'POST,
        headers: {
          Accept: 'application/json',
          'Content-Type: 'application/json', 
        }, 
        body: Json.stringify({
          firstParam: 'yourValue',
          secondParam: 'yourOtherValue'
        }),
        });
      }    */
  }

  render() {
    
    if (this.state.isLoading) {

      return(
        <View style={styles.container}>
        <ActivityIndicator/> 
        </View>
      )
    } else {

      let movies  = this.state.dataSource.map((val, key) => {
        return  <View key={key} style ={styles.item}>
                      <Text>{val.title}</Text>
                      </View>
      });

      return (

            <View style={styles.container}>
             {movies}
            </View>
        );
    }
  }
}
  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    flex: 1,
    alignSelf: 'stretch',
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 20,
    borderBottomColor: '#eee'
  }
});
