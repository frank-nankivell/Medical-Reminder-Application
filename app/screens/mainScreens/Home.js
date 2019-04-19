import React, {Component} from 'react';
import {
    ScrollView,
    Text,
    View,
    TouchableOpacity,
    Image,
    StatusBar,
    Button,
    ActivityIndicator,
    AsyncStorage,
    ImageBackground,
    StyleSheet } from 'react-native';

import colors from '../../constants/colors';

import List from '../../components/List';
import bgImage from '../../images/background1.jpg';
import Header from '../../components/Header';
import { FlatList } from 'react-native-gesture-handler';
const headerTitle = 'Your Medication Reminders';

class Home extends Component {
    constructor() {
        super()

        state = {
          loggedin: true,
          press: false,
          loadingItems: false,
          allItems: {},
          weekItems: {},
          todayItems: {},
          day: true,
          currentDate: this.getCurrentDate(),
        };

          componentDidMount = () => {
            this.loadingItems();
        }
      };


  getCurrentDate = () => {
    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1;
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
      newdate = year + "-" + month + "-" + day;
      return newdate;
  }

    loadingItems = async () => {
		try {
      const CurrentDate = this.state.currrentDate;
      const allItems = await AsyncStorage.getItem('MedicationReminder');
			this.setState({
				loadingItems: true,
				allItems: JSON.parse(allItems) || {}
      });
      console.log()
		} catch (err) {
			console.log(err);
		}
  };

  _signOutAsync = async () => {
    try {
        await AsyncStorage.removeItem('userToken');
        this.props.navigation.navigate('Auth');
      } catch (error) {
        // Error retrieving data
        console.log(error.message);
      }
    }



    _getDayReminders = () => {
      const CurrentDate = this.state.currrentDate;
      var todayItems;
      this.setState({
        day: true,
        todayItems: JSON.parse(todayItems) || {}
      })
    };

    _getWeekReminders = () => {
      this.setState({
        day: false
      })
    };




    deleteItem = id => {
            this.setState(prevState => {
              const allItems = prevState.allItems;
              delete allItems[id];
              const newState = {
                ...prevState,
                ...allItems
              };
              this.saveItems(newState.allItems);
              return { ...newState };
            });
          };
    
      completeItem = id => {
            this.setState(prevState => {
              const newState = {
                ...prevState,
                allItems: {
                  ...prevState.allItems,
                  [id]: {
                    ...prevState.allItems[id],
                    isCompleted: true
                  }
                }
              };
              this.saveItems(newState.allItems);
              return { ...newState };
            });
          };

          incompleteItem = id => {
            this.setState(prevState => {
              const newState = {
                ...prevState,
                allItems: {
                  ...prevState.allItems,
                  [id]: {
                    ...prevState.allItems[id],
                    isCompleted: false
                  }
                }
              };
              this.saveItems(newState.allItems);
              return { ...newState };
            });
          };
    
          deleteAllItems = async () => {
            try {
              await AsyncStorage.removeItem('Medication');
              this.setState({ allItems: {} });
            } catch (err) {
              console.log(err);
            }
        };

render() {
    const { loadingItems, allItems } = this.state;
    if(loadingItems==true) {
        return (
        <ImageBackground source={bgImage} style={styles.backgroundContainer}>
        <View style={styles.centered}>
              <Header title={headerTitle} />
        </View>
       
        <View style={styles.toggleButtons} >
        <TouchableOpacity style={styles.toggleButtons}>
          <Button 
              style={styles.buttonDay}
              title="Reminders for today" 
              color="white" 
              onPress={this._getDayReminders}>
            </Button>
            </TouchableOpacity>
            <TouchableOpacity style={styles.toggleButtons}>
          <Button 
            style={styles.buttonWeek}
              title="Reminders for this week" 
              color="white" 
              onPress={this._getWeekReminders}>
            </Button>
            </TouchableOpacity>
        </View>
        <View>
        <FlatList
            data={allItems}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
            <Text>{item.id.inputValue}</Text>
            )}
        />
    </View>
        <View style ={styles.buttonStyler}>
            <Button color='rgba(0,0,0,0.5)'
                    style={styles.standardText} 
                    title="sign me out" 
                    size={30}
                    onPress={() => this.props.navigation.navigate('Auth')}/>
        </View>
      </ImageBackground>
            )} else 
            return (
                <ImageBackground source={bgImage} style={styles.backgroundContainer}>
                <ActivityIndicator size='large' color="white" />
            </ImageBackground>
        );
    };
};


const styles = StyleSheet.create ({
    text: 
        {
        fontSize: 30, 
        color: 'white', 
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 150
        },
    standardText: {
        color: 'rgba(0,0,0,0.5)', 
        fontSize: 20,
        fontWeight: '500',
        marginTop: 15,
        opacity: 2
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
      },
      toggleButtons: {
          flex: 1,
          marginTop: 10,
          flexDirection: 'row',
          alignItems: 'stretch',
          justifyContent: 'center',
        },
        buttonDay: {
          flex: 1,
          height: 45,
          borderRadius: 45,
          backgroundColor: colors.lightblue,
          opacity: 1,
        },
        buttonWeek: {
          flex: 1, 
          backgroundColor: colors.green1,
        }

});
export default Home;