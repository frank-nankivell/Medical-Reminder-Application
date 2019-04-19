import React, {Component} from 'react';
import {
    ScrollView,
    Text,
    View,
    Image,
    StatusBar,
    Button,
    ActivityIndicator,
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
          loadingItems: false,
          allItems: {},
        }
      }
      componentDidMount = () => {
		this.loadingItems();
	};

      loadingItems = async () => {
		try {
			const allItems = await AsyncStorage.getItem('MedicationReminder');
			this.setState({
				loadingItems: true,
				allItems: JSON.parse(allItems) || {}
			});
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

        <Text style={styles.text}>Check your Medical Reminders</Text>
        <View style ={styles.buttonStyler}>
            <Button color='rgba(0,0,0,0.5)'
                    style={styles.standardText} 
                    title="sign me out" 
                    size={30}
                    onPress={() => this.props.navigation.navigate('Auth')}/>
        </View>

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

            ) } else 
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

});
export default Home;