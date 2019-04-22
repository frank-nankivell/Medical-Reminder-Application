# Code explantion

The application uses the typical framework of react which splits items into:

- screens, 
- constants, 
- components,  
- navigation

Some react-native application also host a services feature, which is not implemented in this app.

#Root

In the root folder there is an app.js file - this file is where picks up for runtime and as noted in this application what is rendered is the AppNavigator component from the navigation. 

#Navigation
Navigation uses the react-native-navigation library to support it. There are two types of navigation libaries uses, both stacknavigation and tabnavigation.

navigation/AppNavigator where the app.js file directs a navigator element of the combined other navigators. These are the other four JS files withi the folder. LocationNavigator, MainTabNavigator and SplashNavigator.

Each Navigator uses a number of screens from within the screens folder to render data. 

#Screens

For simplicity the screens are broken into a number of sections, 

- loginScreens. Holding the two screens used on login
- mainScreens. Holding two main screens of the app
- orderScreens. Holding the single LocationHome

The




