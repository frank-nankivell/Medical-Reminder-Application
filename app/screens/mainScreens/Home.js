import React, {Component} from 'react';
import {
    ScrollView,
    Text,
    View,
    Image,
    StatusBar,
    Button,
    AsyncStorage,
    ImageBackground,
    StyleSheet } from 'react-native';


import List from '../../components/List';
import bgImage from '../../images/background1.jpg';
import Header from '../../components/Header';
const headerTitle = 'Your Medication Reminders';
class Home extends Component {
    constructor() {
        super()
        this.state = {

          loggedin: true,
          press: false,
          allItems: {},
          isCompleted: false
        }
      }
    render() {
        const { inputValue, loadingItems, allItems } = this.state;

    _signOutAsync = async () => {
        try {
            await AsyncStorage.removeItem('userToken');
            this.props.navigation.navigate('Auth');
          } catch (error) {
            // Error retrieving data
            console.log(error.message);
          }
        }
// create section list for accessing 
    return (
        <ImageBackground source={bgImage} style={styles.backgroundContainer}>
        <View style={styles.centered}>
              <Header title={headerTitle} />
        </View>

        <ScrollView>
        <Text style={styles.text}> Participant App </Text>
        <View style ={styles.buttonStyler}>
            <Button title="sign me out" onPress={() => this.props.navigation.navigate('Auth')}/>
        </View>
        </ScrollView>


        <View style={styles.list}>
            <ScrollView contentContainerStyle={styles.scrollableList}>
                {Object.values(allItems)
                .reverse()
                .map(item => (
                    <List
                    key={item.id}
                    {...item}
                    deleteItem={this.deleteItem}
                    completeItem={this.completeItem}
                    incompleteItem={this.incompleteItem}
                    />
                ))}
            </ScrollView>
            </View>

        </ImageBackground>
        );
    }
};
const styles = StyleSheet.create ({
    text: 
        {
            fontSize: 50, 
            fontWeight: 'bold',
            textAlign: 'center',
            marginTop: 300
        },
    buttonStyler:
        {
            marginTop: 50,
            marginBottom: 10
        },
    logo:
    {
        marginTop: 10,
        marginBottom: 10
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 50
      },
      backgroundContainer: {
        flex: 1,
        width: null, 
        height: null,
        justifyContent: 'center',
        alignItems: 'center'
      }


});
export default Home;