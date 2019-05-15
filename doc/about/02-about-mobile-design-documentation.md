# Why it is suited to be a mobile application?

- 1) Medicines are often taken in a location on the move. The most frequented locations are beds and kitchens, (due to medication needing to be taken withn food), however medicine can be taken almost anywhere! Designing an applicaiton that is able to as close to the user when they take their medication as possible is pivotal. 

- 2) The application has been built with the pharmacy finder aspect to track to the users current location. Although this has been built through using a google API request, the simplicity of selecting a button to find out the location of nearby pharmacies means that it will be able to be used effectively by elderley users. It means that elderley users could be walking around and the application will still be able to provide them detail of where they can access local pharmacies - even whilst they walk there, this functioanlity would be unsuitable on a desktop device.

#How it has been designed for mobile use?

The application has been designed for mobile use through three main parts:

- 0) Technology choices (as documented in the 03-about doc)
- 1) UX design
- 2) Functional attributes and user stories

## 1 UX Design

The design of the application is aimed at being very simple, therefore not loosing elderley users. The app has a limited number of screens and relatively large buttons. Each button is always nearly the width of the screen and large enough for users to read the text on it.

The colour scheme of the application has focused at reflecting the pharmaceutical industry. This decsion was taken to ensure it is taken seriously by users and therefore each user is potentially more likely to take their Medicine. Other medical or drug related applications commonly follow a similar color scheme. The primary background for much of the application is two open source images which set a backdrop of clinical work throughout the app.

## 2 Functional attribute and user stories

Functional components of the application are based around three primary use stories:.

#### Creating a reminder.
- ie 'As a user I want to be able to create a reminder about a medicine I need to take.' 
#### Viewing your reminders
- ie 'As a user I need to be able to view the reminders on the medicines I have'

#### Searching for a Pharmacy
- ie 'As a user I want to be able to search for a pharmacy close to where I am.

These three attributes are the focus of one of the three key screens of the application. Home.js, Medication.js, LocationHome.js

Each screen addresses the primary need and use case of the users, ensuring the the correct functionality is available upon each. 

Home.js uses a simple list component to render a list of reminders when they have been created and not completed.

Medication.js provides a static form which users are able to enter and create a reminder.

LocationHome.js renders a map based upon the user location, this location is taken from the phones geographic position.

## Summary

The above provides a brief overview on some of the design decisions for the application  and key user stories.


