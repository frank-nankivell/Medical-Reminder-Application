# 3. React Native Navigation

Date: 13.04.2019

## Status

Accepted

## Context

There are a number of mechanisms and routing options available for a react-native application. These include more traditional http req/res routing which would be found within an express application, or native tooling for react. 

React-native-navigation is a framework that is developing and therefore previous versions (1 and 2 ) had a number of inconsistencies. Version 3+ also potentially has some bugs within it - however there are a considerable number of benefits to using it as the routing framework for the application. This includes the ability to use ' this.props.navigation.navigate' when calling state on a function.

This does mean however that createAppContainer and stackNaviator need to be initially established and set out within the navigation folder - or risk complexity when building further attributes of the application.
 
## Decision

I will use react-native-navigation for the development for the application.

## Consequences

Use react-native as described here by https://github.com/wix/react-native-navigation