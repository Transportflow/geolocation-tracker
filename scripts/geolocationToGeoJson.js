const fs = require('fs');
const data = JSON.parse(fs.readFileSync(process.argv[2], 'utf-8').toString());

let geoJson = {
  type: 'FeatureCollection',
  features: []
}

data.forEach(entry => {
  let value = entry.value;
  geoJson.features.push({
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [value.longitude, value.latitude]
    },
    properties: {
      accuracy: value.accuracy,
      altitude: value.altitude,
      altitudeAccuracy: value.altitudeAccuracy,
      heading: value.heading,
      name: entry.timestamp,
      speed: value.speed
    }
  })
});

fs.writeFileSync(process.argv[2].replace('.json', '.geojson'), JSON.stringify(geoJson, null, 2));