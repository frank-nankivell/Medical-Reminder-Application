# 8. Pharmacy Data

Date: 22.04.2019

## Status

Accepted

## Context

The location of the data from the MAP component will be required to be populated by an API call and fed back to the MAP. This could come from a number of locations. The NHS has an API https://developer.api.nhs.uk/ however on evaluation this API has a number of issues and returns in XML which is not native to react. Furthermore this API is considerably better if searching for data that focuses on medical centres, which is not the precise data in this example.

As noted in the commit history there were a number of prototypes completed with the NHS API. 

Google has an alternative: https://developers.google.com/places/web-service/intro however this will require some configuration to ensure the correct paramaters are passed it, and the users location. It will response with JSON however and will also give more accurate data than the NHS API for pharmacies.

## Decision

To use the Gooogle nearby place API for the request to populate the MAP

## Consequences

To use the Google nearby place API to access the data on local pharmacies