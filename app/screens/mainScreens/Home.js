import React, {Component} from 'react';
import {
    ScrollView,
    StatusBar,
    Text,
    View,
    Modal,
    TouchableHighlight,
    TouchableOpacity,
    Image,
    Button,
    AlertIOS,
    Platform,
    Dimensions,
    ActivityIndicator,
    AsyncStorage,
    ImageBackground,
    StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import colors from '../../constants/colors';
const { height, width } = Dimensions.get('window');
import List from '../../components/List';
import bgImage from '../../images/background1.jpg';
import logo from '../../images/logo.png'
import pillColor from '../../constants/colors';
import Header from '../../components/Header';
import { Title } from 'native-base';
const headerTitle = 'Your Medication Reminders';
const  { width: WIDTH} = Dimensions.get('window');

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: null,
      modalVisible: false,
      isCompleted: false,

      allItems: {},
      loadingItems: false,

      todayItems: {},
      loadingPosition: 0
    };
  }


  componentDidMount = () => {
    this._onFocusListener = this.props.navigation.addListener('didFocus', (payload) => {this.loadingItems();
    });
  };

    loadingItems = async () => {
		try {
      const allItems = await AsyncStorage.getItem('MedicationReminder');
			this.setState({
        loadingPosition: 1,
        loadingItems: true,
				allItems: JSON.parse(allItems)|| {}
      });
      console.log()
   //  console.log(allItems,'items to render') // check that items have loaded on start
		} catch (err) {
			console.log(err,'failure');
		}
  };

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

    _loadingToday = async () => {
      try {
        var allItems, currentDate, todayItems; 
        allItems = await AsyncStorage.multiGet('MedicationReminder');
        currentDate = this.getCurrentDate();
        todayItems = allItems.filter((item) => item.createdAt === currentDate )
        this.setState({
          todayItems: todayItems,
          loadingToday: true,
        })
        console.log(todayItems, 'today Items')
         } catch (err) {
           console.log(err,'failure');
         }
       };
  _getWeekReminders = () => {
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
        _helpButton = () => {
          AlertIOS.alert('help')
        }
        
    _navReminder = () => {
      try {
        this.props.navigation.navigate('Medication');
      } catch (error) {
        // Error retrieving data
        console.log(error.message);
      }
    };

    saveItems = newItem => {
      const saveItem = AsyncStorage.setItem('MedicationReminder', JSON.stringify(newItem));
    };

    showItem = (value, notes, endDate, dosage) => {
      AlertIOS.alert('Your Medication notes are... ' + notes+  '\n End date for Medication is '+ endDate)
    };



render() {
    const { loadingItems, allItems, loadingPosition} = this.state;
    if(loadingItems==true) {
        return (
        <ImageBackground source={bgImage} style={styles.backgroundContainer}>
        <View style={styles.centered}>
              <Header title={headerTitle} />
        </View>
       
        <View style={styles.backgroundModalContainer} >
        <Modal
          animationType="fade"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Back to home screen');
          }}>
          <View style={styles.backgroundModalContainer}>

            <View style ={styles.textModalContainer}>

              <Text
              style={styles.textModalContainerStyle}
              > This application is all about reminding you about your medication.</Text>
               <Text
               style={styles.textModalContainerStyle}
              > When you create a reminder from the 'create reminders' this will then present itself on your home screen.</Text>
              <Text
              style={styles.textModalContainerStyle}
              >If you want to find our more about each reminder you can select the pill Icon (like the one below) and a popup will appear.</Text>
               <MaterialCommunityIcons
                name="pill"
                size={24}
              />
              <Text
              style={styles.textModalContainerStyle}
              >Otherwise you can select the circle and then the tick button to show you have completed it!</Text>
              </View>
              <TouchableOpacity style={styles.btnCanceModal}>
                    <Button
                    raised
                    style ={styles.buttonStyler}
                    title = "Okay I get it now"
                    color="white"
                    onPress={() => {
                      this.setModalVisible(!this.state.modalVisible);
                    }}>
                    </Button>
                  </TouchableOpacity>
            </View>
        </Modal>
        </View>

        <View style={styles.modalContainer}>
        <TouchableOpacity
        style={
          styles.buttonHelp}
          onPress={() => {
            this.setModalVisible(true);
          }}>
          <View style={styles.columnHelpTextPosition}>
          <Text style={styles.columnHelpText}> Click to find out more...</Text>
          
          <View style={styles.columnHelpIcon}>
          <MaterialIcons
                name="help-outline"
                size={35}
                color={'white'}
              />
        </View>
        </View>
        </TouchableOpacity>
      </View>
        {
           allItems.length != 0  && loadingPosition == 1?
       
        <View style={styles.list}>
            <ScrollView contentContainerStyle={styles.scrollableList}>
              {Object.values(allItems)
                .reverse()
                .map(item => (
                  <List
                    key={item.id}
                    {...item}
                    showItem={this.showItem}
                    deleteItem={this.deleteItem}
                    completeItem={this.completeItem}
                    incompleteItem={this.incompleteItem}
                  />
                ))}
        </ScrollView>
        </View>
        
      :   
        <View style={styles.reminderList}>
          <Text style={styles.standardText}> 
                No Reminders currently Set
            </Text>
            <TouchableOpacity style={styles.buttonNav}>
            <Button 
            style={styles.buttonWeek}
              title="Make a reminder now" 
              color="rgba(0,0,0,0.5)" 
              onPress={this._navReminder}>
            </Button>
            </TouchableOpacity>
           </View>
      }
             
        <View style ={styles.buttonStyler}>
            <Button color='white'
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
        marginTop: 30
        },
        backgroundModalContainer: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#6EC3CF'
        },
        btnCanceModal: {
          width: WIDTH -55,
          height: 45,
          borderRadius: 45,
          backgroundColor: 'rgba(0,0,0,0.5)',
          justifyContent: 'center',
          marginTop: 30,
          opacity: 0.75
        },
        textModalContainer: {
          flexDirection: 'column',
          alignItems: 'center',
        },
        textModalContainerStyle: {
          fontSize: 25, 
        color: 'white', 
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 30
        },
        modalContainer: {
          width: WIDTH -55,
          height: width / 8,
          flexDirection: 'row',
          borderRadius: 45,
          backgroundColor: '#5E99C9',
          justifyContent: 'center',
          marginTop: 5,
          opacity: 1,
          ...Platform.select({
            ios: {
              shadowColor: 'rgb(50,50,50)',
              shadowOpacity: 0.8,
              shadowRadius: 2,
              shadowOffset: {
                height: 2,
                width: 0
              }
            },
          })
        },
        columnHelpView: {
          flexDirection: 'row',
          alignItems: 'flex-start',
        },
        columnHelpTextPosition: {
          flexDirection: 'row',
          alignItems: 'center',
          marginLeft: 100,
        },
        columnHelpIcon: {
          flexDirection: 'row',
          alignItems: 'flex-start',
          marginRight: 100

        },
        columnHelpText: {
          fontSize: 20,
          fontWeight: '300',
          color: 'white',
          flexDirection: 'row',
          width: width / 1.5
        },
        reminderList: {
          flex: 1, 
          alignItems: 'center',
          justifyContent: 'flex-start'
        },
        buttonStyler: {
          width: WIDTH -55,
          height: 45,
          borderRadius: 45,
          backgroundColor: 'rgba(0,0,0,0.5)',
          justifyContent: 'center',
          marginTop: 30,
          opacity: 0.75,
          marginBottom: 10,
        },
    standardText: {
        color: 'white', 
        fontSize: 20,
        fontWeight: '500',
        marginTop: 15,
        opacity: 2
        },
        btnLogin: {
          width: WIDTH -55,
          height: 45,
          borderRadius: 45,
          backgroundColor: '#4EEEFF',
          justifyContent: 'center',
          marginTop: 30,
          opacity: 0.75
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
          alignItems: 'stretch',
          justifyContent: 'center',

        },
        buttonDay: {
          flex: 1,
          opacity: 0.75,
          marginTop: 40,
          borderRadius: 45,
          backgroundColor: 'rgba(0,0,0,0.5)',
          width: width - 55,
          height: width / 10,
          alignItems: 'center',
          justifyContent: 'space-between',
          marginVertical: 5,
          ...Platform.select({
            ios: {
              shadowColor: 'rgb(50,50,50)',
              shadowOpacity: 0.8,
              shadowRadius: 2,
              shadowOffset: {
                height: 2,
                width: 0
              }
            },
            android: {
              elevation: 5
            }
          })
        },
        buttonWeek: {
          flex: 1,
          marginTop: 40,
          height: 45,
          borderRadius: 45,
          backgroundColor: colors.green1,
        },
        list: {
          width: WIDTH -50,
          paddingBottom: 20,
          flexDirection: 'column',
          flex: 1,
          alignItems: 'stretch',
          marginBottom: 30,
          color: 'black',
          fontSize: 20,
          paddingVertical: 20
        },
        colHeader: {
          fontSize: 20,

        },
        colwrapper: {
          backgroundColor: colors.lightWhite,
          borderWidth: 5,
          backgroundColor: colors.green1
        },
        buttonNav: {
        width: WIDTH -55,
        height: 45,
        borderRadius: 45,
        backgroundColor: '#4EEEFF',
        justifyContent: 'center',
        marginTop: 30,
        opacity: 1,
        },

});
export default Home;