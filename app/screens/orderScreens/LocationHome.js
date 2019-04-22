import React from 'react';
import {Text,LogoTitle, Button, SafeAreaView, AsyncStorage, StyleSheet, ActivityIndicator, ImageBackground, View, alert, LOCATION  } from 'react-native';
import {MapView, Marker, Location, Permissions} from 'expo';
import {Constants} from 'expo';
import { ScrollView, RotationGestureHandler } from 'react-native-gesture-handler';
const k = 'AIzaSyDPC3aFjcV7EIznzmBPT3zaYqNlizE6PsA';
import bgImage from '../../images/background1.jpg';
import { lastFromTime } from 'uuid-js';
import { isLoading } from 'expo-font';
import { withOrientation, NavigationActions, HeaderBackButton} from 'react-navigation';




class LocationHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      markers: [],
      location: null,
      radius: '5000'
    };
  }

  componentDidMount() {
    this.getLocationAsync();
}
    navigationAction = async () => {
      userID = await AsyncStorage.getItem('userToken');
      console.log('initial id,', userID)
      if(userID)
      {
       this.props.navigation.navigate('Home');
      } else {
        this.props.navigation.navigate('Splash');
      }
    };


  getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied'
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    await this.setState({ location });
    console.log('user location : ', location);
    this.fetchMarkerData(location);
};

  fetchMarkerData(location) {
    //https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&fields=formatted_address,name,opening_hours,geometry&radius=1500&type=pharmacy&keyword=pharmacy&key=AIzaSyDPC3aFjcV7EIznzmBPT3zaYqNlizE6PsA
    
    var googlePlace='https://maps.googleapis.com/maps/api/place/nearbysearch/json?'
    var location = 'location=' +location.coords.latitude + ','+ location.coords.longitude;
    var radius = 'radius='+ this.state.radius;
    var type='type=pharmacy';
    var keyword = 'keyword=pharmacy';
    var fields = 'fields=formatted_address,name,opening_hours,geometry';
    var key= 'key='+ k;
    var url = googlePlace + '&' + location + '&' + radius + '&' + type + '&'+  keyword + '&' + fields  + '&' + key ;

    console.log('url to run with', url)
    fetch(url) 
    .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ 
          isLoading: false,
          markers: responseJson.results, 
        });
        console.log('api reponse: ',responseJson)
      })
      .catch((error) => {
        console.log(error);
      });
  };

render() {
  const region = this.state.location;
  if (this.state.isLoading == true && this.state.location == null )   {
    return(
      <ImageBackground source={bgImage} style={styles.backgroundContainer}>
      <HeaderBackButton onPress={() => this.props.navigation.dispatch(NavigationActions.back())}>
      </HeaderBackButton>
      <Text style={styles.loading}> Loading Map</Text>
      <ActivityIndicator size='large' style={styles.activityContainer}>
      </ActivityIndicator>
      </ImageBackground>
    )} else {
    return (
      <SafeAreaView style={styles.container}>
      <HeaderBackButton onPress={this.navigationAction}>
      </HeaderBackButton>
      
      <MapView
      showsUserLocation
      showsCompass
      showsMyLocationButton
      style={{ flex: 1 }}
      region={{
        latitude: this.state.location.coords.latitude,
        longitude: this.state.location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
  >
          {this.state.markers.map((marker, index) => {
       const coords = {
           latitude: marker.geometry.location.lat,
           longitude: marker.geometry.location.lng,
       };
  
       const metadata = ('Rating'+ marker.rating + '\n' + marker.vicinity);
  
       return (
           <MapView.Marker
              key={index}
              coordinate={coords}
              title={marker.name}
              description={metadata}
           />
       );
      })}
      </MapView>
    </SafeAreaView>
      );
    };
    }
  };

const styles = StyleSheet.create ({
  backgroundContainer: {
    flex: 1,
    width: null, 
    height: null,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loading: {
    color: 'white',
    fontSize: 25,
    marginBottom:20,
  },
  activityContainer: {
    color:'white'
  },
  container: {
    flex: 1, backgroundColor: '#fff',
  }
});

export default LocationHome;
