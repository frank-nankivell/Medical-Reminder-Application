# What technology has been used to create the app and why?

The app has been built on Javascript using Node JS and React-Native through EXPO.

See Node docs:
https://nodejs.org/en/docs/

See React-Native docs: 
https://facebook.github.io/react-native/docs/getting-started

See expo docs:
https://docs.expo.io/versions/latest/

As set out in the adr 002-react-native.md in the 'adr' folder, React-native has been used as it is cross platform and provides a number of intuitive design features that enable mobile development to be very intuitive. 

As further expanded on doc/adr/004-expo.md expo is a recent extension of react which provides further functionality.

NodeJS has simply been used because it is a requirement for react-native to run upon. 

The following ADRs explain the rest of the decisions made on the technological decisions:

doc/adr/003-react-native-navigation.md
doc/adr/005-menu-structure.md
doc/adr/006-view-content.md
doc/adr/007-async-storage-for-api.md
doc/adr/008-pharmacy-data.md
doc/adr/009-map-choice.md


# Code explantion

### Below is a brief explanation of how the technology and code of the application works

The application uses the typical framework of react which splits items into:

- screens,
- constant, 
- components  
- navigation

Some react-native application also host a services feature, which is not implemented in this app. There is also function  available from within the root folder.   

##Root

In the root folder there is an app.js file - this file is where picks up for runtime and as noted in this application what is rendered is the AppNavigator component from the navigation. 

##Navigation
Navigation within the application uses the react-native-navigation library to support it. There are two types of navigation libaries uses, both stacknavigation and tabnavigation.

navigation/AppNavigator.js where the app.js file directs a navigator element of the combined other navigators. These are the other four JS files withi the folder. LocationNavigator, MainTabNavigator and SplashNavigator.

Each Navigator uses a number of screens from within the screens folder to render data. 

##Screens

For simplicity the screens are broken into a number of folders. 

- loginScreens. Holding the two screens used on login
- mainScreens. Holding two main screens of the app
- orderScreens. Holding the single LocationHome

The screens that are documented on the 02-about-mobile-design-documentation.md each address a focused user story that the app has been designed to support.

The important screens within the application are below:

mainScreens/Home.js
mainScreens/Medication.js
orderScreens/LocationHome.js

The above three screens are also accessible through a constant tabNavigator.

The additional splash.js and login.js screens each provide simple navigation to the maintabNavigation. Navigation with each of these screens occurs 

###State in each screen

React-native provides a feature called state. Each screen is used to declare it as a component. This is initially done like the below: 

 ```javascript
class [insert] extends Component{
    /*
    insert component code
    */
}
export default [insert]

 ```

However inside the class, each component can either be declared with inherited state through a constructor with super, like the below.

 ```javascript
 constructor(props) {
    super(props);
    this.state = {
        1blah: false,
    }
```

or loaded without the constructor.
```javascript
    state = {
        blah: blah
     }
```
The primary screens use both approaches. Home.js and LocationHome.js delcare themselves with super() and inherited state, this is because each of the screens use components that also set state externally - and therefore it is imperative that each inherits this effectively. However the Medication.js screen is essentially wanting to be left blank each time  - as it is a form that needs to be cleared. This therefore makes much better sense to be left with a reset state each time.

In addition the Home.js also inherits state from AsyncStorage, as set out in adr/007.

This is completed by a simple async function:

```javascript
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
```
The function loads the data from AsyncStorage and then sets the state of allItems to this data. It has been developed like this to ensure that data is always loaded.

However, to ensure this function occurs on loading, componentDidMount needs to be called when ever the page essentially 'refocuses'. This is then documented below.

componentDidMount provies a way for some data to be loaded outside of state when the page is launched.


```javascript
componentDidMount = () => {
    this._onFocusListener = this.props.navigation.addListener('didFocus', (payload) => {this.loadingItems();
    });
  };
```

##Constants

The constants folder only holds a single colors file in this application. This file is then imported into the application to ensure there is continuation of the medical theme. This is centered around a number of primary colors: lightWhite, tintColor, green1, green2 lightblue; each set on by an RGB color.

##Components

The components folder holds four files, each file is then able to be be imported within each of the screens like this:

```javascript
import Header from '../../components/Header';
```
Once each component has been imported they are then able to be used within the render() section of the screen. This ensures that any inherited JSX render from the components and functions are also able to be included too.

An example below...

The home screen imports the List component and provides it props in which it uses to render the list. 

The properties that are available to be passed the List component are declared at the render() function, as below

```javascript
    const { value, dosage, interval, endDate, notes, deleteItem, id, isCompleted, showItem} = this.props;
```

In Home.js the List is then rendered and then passed is properties through mapping through the properties of an object

```javascript
  <List
    key={item.id}
    {...item}
    showItem={this.showItem}
    deleteItem={this.deleteItem}
    completeItem={this.completeItem}
    incompleteItem={this.incompleteItem}
    />
```

This shows the interplay between screen and components.

## Summary

The above provides a brief overview with how the code has been set out, developed and built.








