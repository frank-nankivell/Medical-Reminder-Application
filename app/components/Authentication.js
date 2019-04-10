/* Attempt at Auth with user details 

class Authentication extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        isLoading: true, 
        datasource: null,
      }
    }
    componentDidMount () {
  
            fetch('https://cipapi-beta.genomicsengland.co.uk/api/2/get-token/'),{
              method: 'POST,
              headers: new Headers ({
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFToken': AccessToken
              }, 
              body: Json.stringify({
                username: AccessPassword,
                password: AccessUsername
              }),
        
        
        => {
  
          this.setState({
            isLoading: false, 
            dataSource: responseJson.movies,
          })
  
        })
  
        .catch((error) => {
          console.log(error)
        });
    
  }


  /// dump of example api call

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
        <View style={{ backgroundColor: 'yellow' }} >
        {React.createElement(UserForm, {}, null)}
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

  */
