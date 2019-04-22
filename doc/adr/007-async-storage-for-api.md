# 7. Async Storage

Date: 22.04.2019

## Status

Accepted

## Context

To provide data back to the user which can be visualised data will be required to retrieve it from a location. An API with a backend could be built to support this however that would take a considerable amount of effort. React has an out the box feature called asynsstorgage. It is unencrypted an therefore is potentially not a productive worthy services, however is more than sufficient for the MVP.

This would not include data from external API's - only data created by the user.

## Decision

To use the Asyncstorage component of react-native for the API and localised storage.

## Consequences

To use Asyncstorage for temporary storage of data Docs: https://facebook.github.io/react-native/docs/asyncstorage