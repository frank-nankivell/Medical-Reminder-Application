import React from 'react';
import {Text, StyleSheet, ActivityIndicator, ImageBackground, View, alert, AsyncStorage } from 'react-native';
import {MapView, Marker} from 'expo';
import {Constants} from 'expo';
import { Location, Permissions } from 'expo';
import { ScrollView } from 'react-native-gesture-handler';
const k = 'AIzaSyDPC3aFjcV7EIznzmBPT3zaYqNlizE6PsA';
import bgImage from '../../images/background1.jpg';
import placesService from '../../services/placesService';
import get from 'lodash/get';
import pick from 'lodash/pick';



class LocationHome extends React.Component {
    constructor() {
    super();
    this.state = {
      isLoading: true,
      locationFound: false,
      latitude: null,
      longitude: null,
      error: null,
      googleError: null,
      markers: [],
      location: null,
      userLocation: null,
      errorMessage: null,
    };
  }
  // on mount find location and fetchmarkerdata
  componentDidMount() {
    this.getLocationAsync();
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
    this.getHospitals();
    console.log('location',this.state.location)
  };
  
  getHospitals = async () => {
    const coords = this.state.location.coords;
    const userLocation = pick(coords, ['latitude', 'longitude']);
    await this.setState({ userLocation })
    this.fetchMarkerData();
  };
  
  fetchMarkerData = async () => {
    // Creation of url string for google maps as per documentatiom https://developers.google.com/places/
    var googlePlace='https://maps.googleapis.com/maps/api/place/findplacefromtext/json?'
    var input = 'input=Hospital';
    var inputtype = 'inputtype=textquery';
    var type='type=hospital'
    var fields = 'fields=formatted_address,name,opening_hours,geometry';
    var distance = '2000@'
    var locationbias = 'locationbias=circle:'+ distance + this.state.userLocation.latitude + ',' + this.state.userLocation.longitude;
    var key= 'key='+ k;
    var url = googlePlace + '&' + input + '&' + inputtype +'&'+  type + '&' + fields + '&' + locationbias + '&' + key ;

    // Fetch call to Google
    console.log('url to fetch', url)

    fetch (url)
      .then((response) => response.json())
      .then((responseJson) => {
       this.setState(prevState => ({
           markers: responseJson.candidates[1],
           isLoading: false
        }))

        console.log('print1', this.state.markers)

      })
        .catch((error) => {
          console.log(error);
          this.setState({ googleError: error.message })
      });

  };
  
    
 
  render()  {
    console.log('dsfghfdszxcfdg',markers)
    if (this.state.isLoading == true) {
    return(
      <ImageBackground source={bgImage} style={styles.backgroundContainer}>
      <Text> Loading...</Text>
      <ActivityIndicator size='large' style={styles.activityContainer}>
      </ActivityIndicator>
      </ImageBackground>
    )};

    const { location, markers } = this.state;
    return (
    <ImageBackground source={bgImage} style={styles.backgroundContainer}>
     <MapView
      style={{ flex: 1 }}
      region={{
        latitude: this.state.location.latitude,
        longitude: this.state.location.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
        >
        {markers.map((marker, index) => {
     const metadata = `Status: ${marker.statusValue}`;

     return (
         <MapView.Marker
            key={index}
            coordinate={marker[0].geometry.location}
            title={marker.stationName}
            description={metadata}
         />
     );
  })}
      </MapView>
  </ImageBackground>
    );
  };
};

const styles = StyleSheet.create ({
  backgroundContainer: {
    flex: 1,
    width: null, 
    height: null,
    justifyContent: 'center',
    alignItems: 'center'
  },
  activityContainer: {
    color:'white'
  }
});

export default LocationHome;
