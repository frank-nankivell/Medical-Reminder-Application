## 1 Participant application - v.0.01


## 2 Start application within development server

to open
'open -a Simulator; expo start'

^ due to a bug with expo and xcode simulator currently not finished.

## 3 Documentation

All documentation for the applications is found within '/doc' folder

### 3.1 ) ADR' - Architectural decision records
All ADRs for the application are recorede within the 'adr' sub foler within 'doc/adr'

ADR's set out choice of technologies and present reasoning as to why the application was developed in a certain way.

### 3.2 ) About 

The about section sets out the application use acase,  the design of the application and a brief overview of how the applications code is used to deliver the application.



Notes: 

#This api call is for rare disease

https://api.nhs.uk/data/services/srv0046/postcode/tq25aw/?distance=50

GET https://api.nhs.uk/data/services/srv0046/postcode/{postcode}/?{distance} HTTP/1.1
Host: api.nhs.uk
subscription-key: key 


#This api call is for cancer

https://api.nhs.uk/data/services/srv0118/postcode/{postcode}/?distance={distance}

GET https://api.nhs.uk/data/services/srv0118/postcode/{postcode}/?distance={distance} HTTP/1.1
Host: api.nhs.uk
subscription-key: key 
