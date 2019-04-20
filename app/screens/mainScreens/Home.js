import React, {Component} from 'react';
import {
    ScrollView,
    Text,
    View,
    TouchableOpacity,
    Image,
    FlatList,
    StatusBar,
    Button,
    Card,
    Alert,
    ActivityIndicator,
    AsyncStorage,
    ImageBackground,
    StyleSheet } from 'react-native';

import colors from '../../constants/colors';

import List from '../../components/List';
import bgImage from '../../images/background1.jpg';
import logo from '../../images/logo.png'
import Header from '../../components/Header';
//import { FlatList } from 'react-native-gesture-handler';
const headerTitle = 'Your Medication Reminders';

class Home extends Component {
    state = {
      loadingItems: false,
      };
        componentDidMount = () => {
          this.loadingItems();
  }

    loadingItems = async () => {
		try {
      const CurrentDate = this.state.currrentDate;
      const allItems = await AsyncStorage.getItem('MedicationReminder');
			this.setState({
        loadingItems: true,
        currentDate: this.getCurrentDate(),
        weekItems: {},
        todayItems: {},
				allItems: JSON.parse(allItems) || {}
      });
      console.log()
      console.log(JSON.parse(allItems)) // check that items have loaded on start
		} catch (err) {
			console.log(err);
		}
  };

    getCurrentDate = () => {
      var dateObj = new Date();
      var month = dateObj.getUTCMonth() + 1;
      var day = dateObj.getUTCDate();
      var year = dateObj.getUTCFullYear();
        newdate = year + "-" + month + "-" + day;
        return newdate;
  };


  _signOutAsync = async () => {
    try {
        await AsyncStorage.removeItem('userToken');
        this.props.navigation.navigate('Auth');
        this.setState({
          loggedin: false,
        })
      } catch (error) {
        // Error retrieving data
        console.log(error.message);
      }
    };


    _getDayReminders = () => {
    };
      /*const CurrentDate = this.state.currrentDate;
      var todayItems;
      this.setState({
        day: true,
        todayItems: JSON.parse(todayItems) || {}
      })
    }; */

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

        keyExtractor = (item) => item.id;
  
        renderItem = ({ item }) => (
          <Card
            image={logo}
            imageStyle={{ height: 50 }}
            containerStyle={[styles.card, { height: item.height }]}
          >
            <Text style={{margin: 10}}>
              {item.value}
            </Text>
            <Text style={{margin: 10}}>
              {item.notes}
            </Text>
            <Text style={{margin: 10}}>
              {item.dosage}
            </Text>
          </Card>
        );


        _helpButton = () => {
          Alert.alert('help')
        }


render() {
    const { loadingItems, allItems } = this.state;
    if(loadingItems==true) {
        return (
        <ImageBackground source={bgImage} style={styles.backgroundContainer}>
        <View style={styles.centered}>
              <Header title={headerTitle} />
        </View>

        <View style={styles.logoContainer}>
        <Image source={logo}
        style={styles.logo}
        />
        </View>
       
        <View style={styles.toggleButtons} >
        <TouchableOpacity style={styles.buttonDay}>
          <Button 
              style={styles.buttonDay}
              title="Reminders for today" 
              color="white" 
              onPress={this._getDayReminders}>
            </Button>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonWeek}>
          <Button 
            style={styles.buttonWeek}
              title="Reminders for this week" 
              color="white" 
              onPress={this._getWeekReminders}>
            </Button>
            </TouchableOpacity>
        </View>

             
        <View style ={styles.buttonStyler}>
            <Button color='rgba(0,0,0,0.5)'
                    style={styles.standardText} 
                    title="sign me out" 
                    size={30}
                    onPress={() => this.props.navigation.navigate('Auth')}/>
        </View>
        <View style ={styles.buttonHelp}>
            <Button color='white'
                    style={styles.standardText} 
                    title="help?" 
                    size={30}
                    onPress={this._helpButton}/>

        {allItems != '' ?
      
      <View style={styles.list}>
      {Object.values(allItems)
        .reverse()
        .map(item => (
      
      <FlatList
            data={item.id}
            key={item.id}
            style={styles.container}
            columnWrapperStyle={styles.column}
            numColumns={3}
            renderItem={item.id}
            />
        ))}
            
    </View>
      : 
            <Text> No Reminders Set </Text>
        }
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
    buttonStyler:{
          marginTop: 50,
          marginBottom: 10
        },
    buttonHelp: {
          marginTop: 50,
          marginBottom: 10,
          paddingLeft: 250,
  
        },
      logo:{
          width: 60,
          height: 60,
        },
    logoContainer: {
        alignItems: 'stretch',
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
          height: 45,
          borderRadius: 45,
          backgroundColor: colors.green1,
        },
        list: {
          flex: 1,
          flexDirection: 'column',
          alignItems: 'stretch',
          backgroundColor: colors.green1,
          color: 'black',
        },
        container: {
          flex: 1,
          paddingTop: 10,
          flexDirection: 'column',
        },
        list: {
          justifyContent: 'space-around',
        },
        column: {
          flexShrink: 1,
        },
        card: {
          width: 10,
          margin: 10,
        },

});
export default Home;