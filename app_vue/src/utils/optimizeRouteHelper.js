import axios from 'axios';

const getGoogPayload = () => {
  const data = {
    "origin": { // specify starting point
      "location":{
        "latLng":{
          "latitude": 37.419734,
          "longitude": -122.0827784
        }
      }
    },
    "intermediates": [ // in-between
      {
        "location":{
          "latLng":{
            "latitude": 37.417670,
            "longitude": -122.069595
          }
        }
      },
      {
        "location":{
          "latLng":{
            "latitude": 37.427670,
            "longitude": -122.069595
          }
        }
      }
    ],
    "destination":{ // specify ending point
      "location":{
        "latLng":{
          "latitude": 37.417670,
          "longitude": -122.079595
        }
      }
    },
    "travelMode": "DRIVE",
    "routingPreference": "TRAFFIC_UNAWARE",
    "computeAlternativeRoutes": false,
    "routeModifiers": {
      "avoidTolls": false,
      "avoidHighways": false,
      "avoidFerries": false
    },
    "languageCode": "en-US",
    "units": "IMPERIAL",
    "optimizeWaypointOrder": "true", // note this special feature being true charges us advanced:route pricing
  };
  return data;
};

// google api call to optimize route
// https://developers.google.com/maps/documentation/routes/opt-way
export const getOptimizedRoute = async (sensorRouteList) => {
  // google headers
  const googApiKey = 'AIzaSyAgixnED4py56GFy-b2hlfYgofEyISUjSo'; //TODO: move to .env
  const googFieldMask = 'routes.duration,routes.distanceMeters,routes.optimizedIntermediateWaypointIndex';
  const URL = 'https://routes.googleapis.com/directions/v2:computeRoutes';
  const data = getGoogPayload();
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-FieldMask': googFieldMask,
      'X-Goog-Api-Key': googApiKey
    }
  }

  try {
    const response = await axios.post(URL, data, config);
    if (response) {
      return response.data;
    }
  } catch(e) {
    console.log('error getting optimized route', e);
  }

};

export default getOptimizedRoute