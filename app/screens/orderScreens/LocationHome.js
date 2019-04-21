import React from 'react';
import {Text, StyleSheet, ActivityIndicator, ImageBackground, View, alert  } from 'react-native';
import {MapView, Marker} from 'expo';
import {Constants} from 'expo';
import { ScrollView, RotationGestureHandler } from 'react-native-gesture-handler';
const k = 'AIzaSyDPC3aFjcV7EIznzmBPT3zaYqNlizE6PsA';
import bgImage from '../../images/background1.jpg';
import { lastFromTime } from 'uuid-js';
import { isLoading } from 'expo-font';





class LocationHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      markers: [],
    };
  }

  componentDidMount() {
    this.fetchMarkerData();
}

  fetchMarkerData() {
    fetch('https://maps.googleapis.com/maps/api/place/findplacefromtext/json?&input=Hospital&inputtype=textquery&type=hospital&fields=formatted_address,name,opening_hours,geometry&locationbias=circle:2000@37.33659906,-122.08220411&key=AIzaSyDPC3aFjcV7EIznzmBPT3zaYqNlizE6PsA')
    //fetch('https://feeds.citibikenyc.com/stations/stations.json') 
    .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ 
          isLoading: false,
          markers: responseJson.candidates, 
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // on mount find location and fetchmarkerdata
/*
  fetchLocationData() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        var lat, lng, userLocation;
        lat = position.coords.latitude;
        lng = position.coords.longitude;
        userLocation = position.coords;
        this.setState({
          userLocation: position.coords,
          error: null,
          locationFound: true,
        });
        console.log('checking for state of coords', lat, lng)
        return lat,lng, userLocation;
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );

  }

  fetchMarkerData(lat, lng) {
    // Creation of url string for google maps as per documentatiom https://developers.google.com/places/
   /* var googlePlace='https://maps.googleapis.com/maps/api/place/findplacefromtext/json?'
    var input = 'input=Hospital';
    var inputtype = 'inputtype=textquery';
    var type='type=hospital'
    var fields = 'fields=formatted_address,name,opening_hours,geometry';
    var distance = '5000@'
    var locationbias = 'locationbias=circle:'+ distance + lat + ','+ lng;
    var key= '&key='+ k;
    var url = googlePlace + '&' + input + '&' + inputtype +'&'+  type + '&' + fields + '&' + locationbias + '&' + key ;
*/
//
/*
var newurl = 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json?&input=Hospital&inputtype=textquery&type=hospital&fields=formatted_address,name,opening_hours,geometry&locationbias=circle:2000@37.33659906,-122.08220411&key=AIzaSyDPC3aFjcV7EIznzmBPT3zaYqNlizE6PsA';
    // Fetch call to Google
  //  console.log('url to fetch',url)
      fetch(newurl)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log('printing response',responseJson.candidates)
        this.setState({ 
          isLoading: false,
          googleError: false,
          markers: responseJson.candidates,
        });
      })
      //console.log(responseJson)
      .catch((error) => {
        console.log(error);
        this.setState({ googleError: error.message })
      });
};
*/

  // renders list of hospitals on the map
render() {
    return (

      <MapView
      style={{ flex: 1 }}
      region={{
        latitude: 37.3691242,
        longitude: -122.0798702,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
  >
          {this.state.isLoading ? null : this.state.markers.map((marker, index) => {
       const coords = {
           latitude: marker.geometry.location.lat,
           longitude: marker.geometry.location.lng,
       };
  
       const metadata = `Status: ${marker.statusValue}`;
  
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
