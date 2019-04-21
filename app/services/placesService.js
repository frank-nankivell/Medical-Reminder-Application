import react from 'react';
const k = 'AIzaSyDPC3aFjcV7EIznzmBPT3zaYqNlizE6PsA';


  
  
  getHospitals = userLocation => {
    // Creation of url string for google maps as per documentatiom https://developers.google.com/places/
    var googlePlace='https://maps.googleapis.com/maps/api/place/findplacefromtext/json?'
    var input = 'input=Hospital';
    var inputtype = 'inputtype=textquery';
    var type='type=hospital'
    var fields = 'fields=formatted_address,name,opening_hours,geometry';
    var distance = '5000@'
    var locationbias = 'locationbias=circle:'+ distance + userLocation.latitude + ',' + userLocation.longitude; // check if this works
    var key= '&key='+ k;
    
    var url = googlePlace + '&' + input + '&' + inputtype +'&'+  type + '&' + fields + '&' + locationbias + '&' + key ;
    
    // Fetch call to Google
    console.log('url to fetch', url)

    fetch(url)

      .then((response) => response.json())
      .then((responseJson) => {
        this.map(responseJson => {
            return {
                name: responseJson.name,
                address: responseJson.formatted_address,
            }
         
        });
        console.log('response from api',responseJson,)

    })

};
    export default {
        getHospitals

}
