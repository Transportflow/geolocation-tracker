# geolocation-tracker

A simple react app to record device position as json file.<br/>

## getting up and running
`git clone` && `yarn install` <br/>
`yarn start` && `http://localhost:3000`

## output format
Your current position is displayed at the top. 
Once you `start` the recording, your position data is written to 
local storage and persisted until you `clear` the data.
You can retrieve the data as a JSON Array by pressing `Copy JSON`.

```js
[
  {
    "timestamp": 1644677008531,
    "value": {
      "accuracy": 10,
      "altitude": 113,
      "altitudeAccuracy": 12,
      "heading": 278,
      "latitude": 51.0533873,
      "longitude": 13.7460012,
      "speed": 10
    }
  },
  /*...*/
]
```