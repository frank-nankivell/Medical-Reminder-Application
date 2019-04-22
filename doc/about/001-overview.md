

# What is the application? 

#### This application is a medical reminder application. It provides a way for users to create reminders about which medication they need to take and then complete each once the medication has been taken. In addition it also provides a pharmacy locator component to provide users an easy way to locate nearby pharmacies in the event they need to buy replacement medication.

##Background Context 

The globe has an ageing population, many of whom are required to take medication a number of times everyday. Therefore this application has taken into consideration elderley users and their engagement with mobile devices. 

As set out in this paper by Lustig et al [see link] (https://www.pnas.org/content/100/24/14504.short) elderley user are much more likely to forget to take medication regularly. 

This is reinforced here [see link] (https://www.researchgate.net/profile/Reinhard_Lindner/publication/23485347_Adherence_to_medication_in_patients_with_dementia_predictors_and_strategies_for_improvement/links/09e414f980361ac216000000/Adherence-to-medication-in-patients-with-dementia-predictors-and-strategies-for-improvement.pdf) 

Therefore this means that the application does not only need to be user friendly but also considerate of elderley users requirements. 

As set out in this article 'Mental Models of a mobile phone'by Martina Ziefle and Susanne Bay, [See link to their article] (https://link.springer.com/book/10.1007%2Fb100594) older people have greater difficulty using mobile phones and navigating between menus. They are also additionally generally less performant at using mobile devices than younger devices. 

This does clarify there is a strong market for the application, and there will be increasing numbers of users in the future who will be requiring remidners for their medication, who will be increasingly mobile competent.


#What technology has been used to create the app and why?

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


#Why it is suited to be a mobile application?

Medicines are often taken in a mobile location. The most well known location is a location close to food such as the kitchen table. Therefore it is very unlikely that any user that wanted to remember which medicines they had taken today so far would be able to use a desktop - mobile 

#How it has been designed for mobile use?


